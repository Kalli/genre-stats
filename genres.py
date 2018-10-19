#!/usr/bin/python
# -*- coding: utf-8 -*-
from lxml import etree


class GenreStats:
    """
    Parses and calculates genre statistics from a Discogs releases.xml file - http://data.discogs.io

    :param xml_path: Path to a releases.xml file
    :return: A dictionary with years as keys
    """

    def __init__(self, xml_path, genre=None):
        """
        :param xml_path:    Path to a releases.xml file
        :param genre:       If you only want data on a single genre
        """
        self.genre = genre
        self.stats = {}
        context = etree.iterparse(xml_path, events=("start", "end"))
        context = iter(context)
        self.total = 0
        for event, element in context:
            try:
                if element.tag == "release" and event == "end":
                    print(self.is_candidate(element))
            except ValueError, error:
                print error

    def is_candidate(self, release):
        """
        Determine whether or not a release is a candidate for inclusion in our stats based on:

        * Whether it is a master release
        * It doesn't have a master release
        * If we are parsing for a specific genre, whether the release is part of that genre

        :param release:     A release element from the discogs data dumps
        :return:            boolean true if the release should be include, false if not
        """

        # We are only considering masters or master like releases
        master_id = release.find('master_id')
        if master_id is not None:
            # This release is the main release for a master
            is_candidate = master_id.get('is_main_release', False)
        else:
            # this release does not have a master, it can be considered a master by itself
            is_candidate = True

        if self.genre:
            genres = release.find("genres", None)
            if genres is not None:
                is_candidate = is_candidate and self.genre in [genre.text for genre in list(genres)]
        return is_candidate

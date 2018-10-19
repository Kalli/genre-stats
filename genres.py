#!/usr/bin/python
# -*- coding: utf-8 -*-
from lxml import etree
from collections import defaultdict
from datetime import datetime
import json

with open('./style-genre-map.json', 'r') as fp:
    style_genre_map = json.load(fp)


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
        if self.genre:
            self.styles = style_genre_map[self.genre]
        self.stats = {}
        context = etree.iterparse(xml_path, events=("start", "end"))
        context = iter(context)
        total, added = 0, 0
        for event, element in context:
            try:
                if element.tag == "release" and event == "end":
                    total += 1
                    if self.is_candidate(element):
                        added += 1
                        data = self.parse_release(element)
                        self.add_stats(data)
                    if total % 100000 == 0:
                        print('%s - parsed %d, added %d' %  (datetime.now().isoformat(), total, added))
            except ValueError, error:
                print error
        with open('./data/results.json', 'w') as fp:
            json.dump(self.stats, fp)

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

    def parse_release(self, release):
        """
        Parses the information we need from a release

        :param release: The release element

        :return: A dictionary containing the following data (if it was available in the data):

        * year - the year this release came out
        * country - The country this release came out in
        * genres - The genres this release belongs to
        * styles - The styles this release belongs to
        """

        year = release.find("year")
        if not year:
            released = release.find('released')
            if released is not None:
                year = released.text[0:4]

        genres = release.find("genres")
        if genres is not None:
            genres = [genre.text for genre in list(genres)]
        else:
            genres = []

        styles = release.find("styles")
        if styles is not None:
            styles = [style.text for style in list(styles)]
        else:
            styles = []

        country = release.find("country")
        if country is not None:
            country = country.text

        return {
            "year": year,
            "country": country,
            "genres": genres,
            "styles": styles,
        }

    def add_stats(self, data):
        """
        Adds the data from a specific release to the compiled stats of all other releases

        :param data: data from a specific release (see parse_release above)
        """
        if data['year'] not in self.stats:
            self.stats[data['year']] = {
                'countries': defaultdict(int),
                'genres': defaultdict(int),
                'styles': defaultdict(int),
            }
        year = self.stats[data['year']]
        year['countries'][data['country']] += 1

        for style in data['styles']:
            if self.genre and style in self.styles:
                year['styles'][style] += 1
        for genre in data['genres']:
            year['genres'][genre] += 1


GenreStats('./data/discogs_20181001_releases.xml', genre='Electronic')
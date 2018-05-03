""" CSV files management and parsing """

from json import JSONEncoder # Codificación a JSON
import csv # Gestión de ficheros csv


def open_csv(file):
    """ Retrieves a csv file ready for its lecture """
    column_names = next(csv.reader(file))
    return csv.DictReader(file, fieldnames = column_names)


def get_csv_info(filepath, query = "", from_row = None, to_row = None):
    """ Returns the rows of a given csv file in the range of 'from_row' to 'to_row'
        from the ones containing the 'query' value in any of its fields """
    with open(filepath, newline = '')  as file:
        fileReader = open_csv(file)

        returned_info = []

        for row in fileReader:
            if  query.upper() in row['name'].upper() or query.upper() in row['currency'].upper() or query.upper() in row['sector'].upper() or query.upper() in row['region'].upper() or query.upper() in row['class'].upper():
                returned_info.append(row)

    return returned_info[from_row:to_row]


def get_csv_json(filepath, query = "", from_row = None, to_row = None):
    """Returns the information of a given csv, filtered by the given filters, encoded as json"""
    query = query.replace("+", " ")
    return JSONEncoder().encode(get_csv_info(filepath, query, from_row, to_row))


if __name__ == "__main__":
    result = get_csv_json('ETS Development Challenge 2018.csv', from_row=5, to_row=10)
    
    print(result)
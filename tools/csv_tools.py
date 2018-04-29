from json import JSONEncoder
import csv

def open_csv(file):
    column_names = next(csv.reader(file))
    return csv.DictReader(file, fieldnames = column_names)


def get_csv_info(filepath, filterstring = "", from_row = None, to_row = None):
    with open(filepath, newline = '')  as file:
        fileReader = open_csv(file)

        returned_info = []

        for row in fileReader:
            if row['name'][:len(filterstring)] == filterstring:
                returned_info.append(row)

    return returned_info[from_row:to_row]


def get_csv_json(filepath, filestring = "", from_row = None, to_row = None):
    return JSONEncoder().encode(get_csv_info(filepath, filestring, from_row, to_row))


if __name__ == "__main__":
    result = get_csv_json('ETS Development Challenge 2018.csv', from_row=5, to_row=10)
    
    print(result)
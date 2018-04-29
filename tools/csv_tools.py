import csv


def open_csv(file):
            column_names = next(csv.reader(file))
            return csv.DictReader(file, fieldnames = column_names)


def get_cvs_info(filepath, filterstring = "", from_row = None, to_row = None):
    with open(filepath, newline = '')  as file:
        fileReader = open_csv(file)

        returned_info = []

        for row in fileReader:
                if row['name'][:len(filterstring)] == filterstring:
                    returned_info.append(row)

    return returned_info[from_row:to_row]

if __name__ == "__main__":
    result = get_cvs_info('ETS Development Challenge 2018.csv', from_row=5, to_row=10)
    for row in result:
        print(row)
from flask import Flask, render_template, request
from static.tools.csv_tools import get_csv_json

app = Flask(__name__)

@app.route("/")
def output():
    return render_template('inverstment_funds.html')

@app.route("/info", methods=["GET"])
def get_info():
    from_row = request.args .get("from")
    to_row = request.args.get("to")
    search_query = request.args.get("query")

    if from_row is not None:
        from_row = int(from_row)

    if to_row is not None:
        to_row = int(to_row)

    if search_query is None:
        search_query = ""

    return get_csv_json('ETS Development Challenge 2018.csv', search_query, from_row, to_row)

if __name__ == "__main__":
    app.run()
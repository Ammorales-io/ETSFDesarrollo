from flask import Flask, render_template
import tools.csv_tools

app = Flask(__name__)

@app.route("/")
def output():
    return render_template('inverstment_funds.html')

if __name__ == "__main__":
    app.run()
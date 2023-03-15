
##### Import Dependencies ################

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
from flask_cors import CORS



##### Database Set-up ##########
engine = create_engine("sqlite:///Melbourne.db")
Base = automap_base()
Base.prepare(autoload_with=engine)
session = Session(engine)
print(Base.classes.keys())

# dynamically access the table classes
Mel_Rental = Base.classes.Melbourne_2


####### Flask Set-Up ##############

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///Melbourne.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)


#################################
######## FRONT END #############
################################

@app.route("/")
def home():
    return render_template("index.html", title = "Project 3- Week 15")

@app.route("/overview")
def proj_overview():
    return render_template("plots.html")

@app.route('/rental-map')
def rental_map():
    return render_template("map.html")


################################
####### BACKEND ###############
################################
# Flask routes
@app.route('/api/all-data-json', methods= ['GET'])
def get_data():
    results = session.query(Mel_Rental).all()
    data = []
    for row in results:
        data.append({'id': row.id, 'Suburb': row.Suburb , 'Type' : row.Type, 'Method': row.Method, 'Real_Estate_Agent': row.Real_Estate_Agent, 'Distance': row.Distance,
        'Postcode': row.Postcode, 'Number_of_Bedroom' : row.Number_of_Bedroom , 'Number_of_Bathroom': row.Number_of_Bathroom , 'Number_of_Carpark': row.Number_of_Carpark ,
       'Latitude': row.Latitude, 'Longitude':row.Longitude, 'Median_rent_weekly': row.Median_rent_weekly})
    session.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)


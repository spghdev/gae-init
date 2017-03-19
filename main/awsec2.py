import flask
import auth
import model
from main import app
import os.path
from flask import json

@app.route('/awsec2', methods=['GET'])
def get_awsec2_prices():
  filename = os.path.join(app.static_folder, 'data.json')
  data = json.load(open(filename))
  # return flask.jsonify(data)
  #data = open(os.path.join(app.static_folder, "data", "data.json"), "r")
#  print '###filename %s' % (filename)
#  print '###filename %s' % (data)
  return flask.jsonify(data)

#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2016-01-13 17:25:30
# @Author  : 陈小雪 (shell_chen@yeah.net)
# @Version : $Id$

import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8989, debug = True)


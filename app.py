from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy

import sys

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/todoapp'
db = SQLAlchemy(app)


class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'<Todo {self.id} {self.description}>'


db.create_all()


@app.route('/')
def index():
    return render_template('index.html', data=Todo.query.all())


@app.route('/todo/create', methods=['POST'])
def create_todo():
    description = request.form.get('description', '')
    todo = Todo(description=description)
    try:
        db.session.add(todo)
        db.session.commit()
        return redirect(url_for('index'))
    except ValueError as e:
        print(e)
        db.session.rollback()
        flash(
            "An error occurred." + todo.name.data + " could not be listed."
        )
        print(sys.exc_info())
    


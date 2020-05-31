"""Canvas CLI

Usage:
  canvas.py generate --token=<access_token> [--output=<file>]

Options:
  -h --help                 Shows this screen
  --token=<access_token>    Canvas access token (generate in Account>Settings>New Access Token)
  -o --output=<file>        Path to output the generated file [default: ./output.csv]
"""
import requests
import json
import csv

from docopt import docopt
from tqdm import tqdm

BASE_URL = "https://kingalfred.instructure.com/api/v1/"


def get_courses(token):
    """GET /api/v1/courses"""
    COURSES_PATH = "courses"
    r = requests.get(BASE_URL + COURSES_PATH,
                     headers={"Authorization": "Bearer " + token})
    return json.loads(r.text)


def get_assignments(course_id, token):
    """GET /api/v1/courses/:course_id/assignments"""
    ASSIGNMENTS_PATH = "courses/" + str(course_id) + "/assignments"
    r = requests.get(BASE_URL + ASSIGNMENTS_PATH,
                     headers={"Authorization": "Bearer " + token})
    return json.loads(r.text)


def write_assignment(writer, assignment, course):
    writer.writerow({
        'course_id': course['id'],
        'course_name': course['name'],
        'assignment_id': assignment['id'],
        'assignment_name': assignment['name'],
        'assignment_created': assignment['created_at'],
        'assignment_due': assignment['due_at']
    })


if __name__ == '__main__':
    arguments = docopt(__doc__)
    token = arguments['--token']
    output = arguments['--output']

    courses = get_courses(token)

    with open(output, "w") as file:
        fieldnames = ["course_id", "course_name",
                      "assignment_id", "assignment_name", "assignment_created", "assignment_due"]
        writer = csv.DictWritefile, fieldnames = fieldnames)
        writer.writeheader()

        for course in tqdm(courses):
            assignments=get_assignments(course['id'], token = token)
            for assignment in assignments:
                write_assignment(writer, assignment, course)

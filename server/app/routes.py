# Libraries
from flask import Blueprint, url_for
from datetime import datetime

from flask import current_app

# Initialize
router = Blueprint("main", __name__)

@router.route("/test")
def test():
    return {'data': 'test success', "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

# List registered routes
@router.route("/site-map")
def site_map():
    links = []
    for rule in current_app.url_map.iter_rules():
        # Skip rules that require parameters not provided by defaults
        if has_no_empty_params(rule):
            try:
                url = url_for(rule.endpoint, **(rule.defaults or {}))
                methods = ','.join(rule.methods) # type: ignore
                links.append((url, rule.endpoint, methods))
            except BuildError: # type: ignore
                # Skip routes that cannot be built
                continue
    # links is now a list of url, endpoint, methods tuples
    return {"routes": links}

@router.route("/some-post", methods=["POST"])
def some_post():
    return {"data": "some post success"}

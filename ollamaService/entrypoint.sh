#!/bin/bash
set -e

# Start your application or any necessary services here
# For example, if you have a server component, start it in the background

# Keep the container running
tail -f /dev/null &

# Execute the command passed to docker run
exec "$@"

How to free up port 3000:

sudo lsof -i :3000

Followed by:

sudo kill -15 <PID>

(Where PID is the PID of the thing holding the port open when you run the lsof command above)
 #

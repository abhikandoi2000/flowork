flowork
==========

a simple todo web app for those requiring simplicity and a clean interface
Preview: faceinbook.co.nr/flowork/home.html

inspiration
==========

flowork was made as an assignment given to me as a part of SDSLabs, a group of like minded technology inclined students. I have spend considerable amount of time on this assignment to fulfill my need of using as much external libraries as time permits.
flowork was inspired by the simplicity and elegance of workflowy.

external libraries and frameworks
==========

    *   [compass](http://compass-style.org/ "Compass") - CSS Authoring Framework
    *   [foundation](http://foundation.zurb.com/ "Foundation") - responsive front-end framework
    *   [jQuery](http://jquery.com/ "jQuery") - popular jQuery library
    *   [parsley.js](http://parsleyjs.org/ "Parsley.js") - form validation
    *   [Chart.js](http://www.chartjs.org/ "Chart.js") - canvas based HTML 5 charts
    *   [modernizr.js](http://modernizr.com/ "Modernizr") - feature detection library for HTML5/CSS3
    *   [normalize.css](http://necolas.github.com/normalize.css/ "Normalize.css") - HTML5 ready alternate to CSS resets

install
==========

Clone this repository, make appropriate config files, setup the database and voilà you are ready to go.

    git clone git://github.com/abhikandoi2000/flowork.git
    cd flowork
    cp config/config.php.example config/config.php
    nano config/config.php

At this point you are editing the configuration file for the php backend. Edit the php variables according to your MySQL/MariaDB account credentials.
'localhost' for the host should work if you are testing flowork locally. Do make sure that this account has appropriate privilege, ie. the ability to execute queries like modify, select and delete. Also make sure that the pdo_mysql extension is enable in the php.ini configuration file.

The database scheme for flowork can be found in the directory `schema` present in the root of flowork. Use this schema to generate the database, keeping in tune with the account credentials provided in the `config/config.php` configuration file.

Next step is to create a symlink in the root folder of your preferred server(`/var/www` for apache, and `/usr/share/nginx/html` for nginx on linux). This can be done using the following command.

    cd /path/to/root/folder/of/server
    examples:
    cd /usr/share/nginx/html
    cd /var/www
    ln -s /path/to/flowork/root flowork
    example:
    ln -s /home/abhi/projects/flowork flowork

And you are ready to go. Navigate to localhost/flowork/home.html using your favourite browser and enjoy the simplicity that flowork is.

contact me
==========

Feel free to contact me: Tweet me [@kandoiabhi](//twitter.com/kandoiabhi "Tweet @kandoiabhi") or mail me at abhikandoi2000@gmail.com


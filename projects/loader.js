var devCacheBust = Date.now();

fetch('project.json?v=' + devCacheBust, { cache: 'no-store' })
    .then(response => response.json())
    .then(project_json => {
        var src = project_json.src
            , c = 0
            , nc = 0
            , head = document.getElementsByTagName('head')[0];

        for (var i in src) {
            for (var j in src[i]) {
                nc++;
                var script = document.createElement("script");
                script.src = i + src[i][j] + '?v=' + devCacheBust;
                script.async = false;
                script.onload = a => {
                    c++;
                    if (c >= nc) {
                        window.$INIT$(project_json);
                    }
                };
                head.appendChild(script);
            }
        }
    });

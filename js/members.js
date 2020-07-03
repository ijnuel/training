$(document).ready(function(){
    get("https://reqres.in/api/users?page=1", "page1");
    get("https://reqres.in/api/users?page=2", "page2");
});

function get(url, page) {
    $.get(url, {headers: {'content-type': 'application/json'}}).done(function(json) {
        let members = json.data;
        for (var i = 0; i < members.length; i++) {
            let image = document.createElement('img');
            image.setAttribute('alt', "avatar "+members[i]["id"]);
            image.setAttribute('src', members[i]["avatar"]);
            let button = document.createElement('button');
            button.setAttribute('class', 'activated');
            button.innerHTML = "Activated";
            let gear = document.createElement('span');
            gear.setAttribute('class', 'fa fa-gear');
            let arrow = document.createElement('span');
            arrow.setAttribute('class', 'fa fa-caret-down arrow');
            // arrow.setAttribute('id', 'arrow'+members[i]["id"]);
            let drop = document.createElement('div');
            drop.setAttribute('class', 'dropdown-content');
            drop.innerHTML = "<a>Action</a><a>Another action</a><a>Something else here</a><hr><a>Separated link</a>";
            let avatar = document.createElement('div');
            avatar.setAttribute('class','grid-item avatar');
            avatar.innerHTML = image.outerHTML;
            let name = document.createElement('div');
            name.setAttribute('class','grid-item name');
            name.innerHTML = members[i]["first_name"] + " " + members[i]["last_name"];
            let email = document.createElement('div');
            email.setAttribute('class','grid-item email');
            email.innerHTML = members[i]["email"];
            let developer = document.createElement('div');
            developer.setAttribute('class','grid-item developer');
            developer.innerHTML = "Developer";
            let active = document.createElement('div');
            active.setAttribute('class','grid-item');
            active.innerHTML = button.outerHTML;
            let actions = document.createElement('div');
            actions.setAttribute('class', 'grid-item actions');
            actions.innerHTML = gear.outerHTML + arrow.outerHTML + drop.outerHTML;
            let grid = document.createElement('div');
            grid.setAttribute('class', 'gridContainer '+page);
            grid.innerHTML = avatar.outerHTML + name.outerHTML + email.outerHTML + developer.outerHTML + active.outerHTML + actions.outerHTML;
            let pageID = document.createElement('div');
            pageID.setAttribute('class',page);
            pageID.innerHTML = grid.outerHTML;
            document.getElementById('rows').appendChild(pageID);
        }
        $(".page1").show();
        $(".page2").hide();
        $('.arrow').click(function () {
            this.nextElementSibling.classList.add("show")
        });
        $('.pagination a').on('click', function () {
            let target = $(this).attr('href');
            if (target === '#page2' || target === '#rpage') {
                $(".page1").hide();
                $(".page2").show();
                $("a[href$='page2']").attr('class','active');
                $("a[href$='page1']").attr('class','');
                $("a[href$='rpage']").attr('class','active disable');
                $("a[href$='lpage']").attr('class','');
            }
            else if (target === '#page1' || target === '#lpage') {
                $(".page1").show();
                $(".page2").hide();
                $("a[href$='page1']").attr('class','active');
                $("a[href$='page2']").attr('class','');
                $("a[href$='lpage']").attr('class','active disable');
                $("a[href$='rpage']").attr('class','');
            }
        });
        window.onclick = function(event) {
            if (!event.target.matches('.arrow')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }).fail(function() {
        alert( "Sorry, there was a problem!" );
    });
}

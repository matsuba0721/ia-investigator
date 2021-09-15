window.onload = function () {
    function toProfileCard(id, profile) {
        var list = `<div class="ui large inverted horizontal list meta"><div class="item"><div class="content"><div class="header">職業</div><div class="description">${profile.job}</div></div></div><div class="item"><div class="content"><div class="header">年齢</div><div class="ui center aligned description">${profile.age}</div></div></div><div class="item"><div class="content"><div class="header">性別</div><div class="ui center aligned description">${profile.gender}</div></div></div></div>`;
        var content = `<div class="content"><img class="left floated tiny ui image" src="${profile.image}" /><div class="header">${profile.name}</div><div class="meta">${toTags(profile.tag).join(",")}</div>${list}</div>`;
        return `<div id="characteristic-${id}-view" class="card" style="cursor : pointer;">${content}</div>`;
    }
    function linkView(e) {
        var path;
        for (var i = 0; i < e.path.length; i++) {
            path = e.path[i];
            if (path.id) {
                break;
            }
        }

        var matches = path.id.match(/characteristic-(\w+)-view/);
        if (matches == null) return;
        var id = parseInt(matches[1]);
        window.location.href = "view.html?v=" + id;
    }

    $("#link-sheet")[0].addEventListener("click", function(e){
        window.location.href = "sheet.html";
    });

    initSigns();
    initAccount(account);

    setTimeout(function () {
        characteristics = getUserCharacteristics(account);
        for (var i = 0; i < characteristics.length; i++) {
            var characteristic = characteristics[i];
            $("#characteristics").append(toProfileCard(characteristic.id, characteristic.profile));
            $("#characteristic-" + characteristic.id + "-view")[0].addEventListener("click", linkView);
        }
    }, 10);
};

account = getLoginAccount();

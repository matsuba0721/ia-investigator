window.onload = function () {
    function toProfileCard(id, profile) {
        var list = `<div class="ui large inverted horizontal list meta"><div class="item"><div class="content"><div class="header">職業</div><div class="description">${profile.job}</div></div></div><div class="item"><div class="content"><div class="header">年齢</div><div class="ui center aligned description">${profile.age}</div></div></div><div class="item"><div class="content"><div class="header">性別</div><div class="ui center aligned description">${profile.gender}</div></div></div></div>`;
        var content = `<div class="content"><img class="left floated tiny ui image" src="${profile.image}" /><div class="header">${profile.name}</div><div class="meta">${toTags(profile.tag).join(",")}</div>${list}</div>`;
        var extraContent = `<div class="extra content"><div class="ui three buttons"><button id="characteristic-${id}-edit" class="ui button" style="display: flex"><i class="edit outline icon"></i><div>編集</div></button><button id="characteristic-${id}-view" class="ui button" style="display: flex"><i class="eye icon"></i><div>閲覧</div></button><button id="characteristic-${id}-export" class="ui button" style="display: flex"><i class="share icon"></i><div>出力</div></button></div></div>`;
        return `<div class="card">${content}${extraContent}</div>`;
    }
    function linkEdit(e) {
        var matches = (e.path[0].id + e.path[1].id).trim().match(/characteristic-(\w+)-edit/);
        if (matches == null) return;
        var id = parseInt(matches[1]);
        window.location.href = "sheet.html?v=" + id;
    }
    function linkView(e) {
        var matches = (e.path[0].id + e.path[1].id).trim().match(/characteristic-(\w+)-view/);
        if (matches == null) return;
        var id = parseInt(matches[1]);
        window.location.href = "view.html?v=" + id;
    }
    function expoetCharacteristic(e) {
        var matches = (e.path[0].id + e.path[1].id).trim().match(/characteristic-(\w+)-export/);
        if (matches == null) return;
        var id = parseInt(matches[1]);
        characteristic = getEditingCharacteristic(account, id);
        $("#characteristic-export-chatpalette")[0].value = exportChatpalete(characteristic, false);
        $(".ui.tiny.export.modal").modal({ duration: 200 }).modal("show");
    }

    initSigns();
    initAccount(account);

    $(".ui.pointing.menu .item").tab();

    $("#characteristic-export-commands-copy")[0].addEventListener("click", function (e) {
        writeClipboard($("#characteristic-export-chatpalette")[0].value);
    });

    $("#characteristic-export-commands-copy-ccfolia")[0].addEventListener("click", function (e) {
        var ccfoliaCharacteristic = getCcfoliaClipboardCharacteristic(characteristic);
        writeClipboard(JSON.stringify(ccfoliaCharacteristic));
    });

    setTimeout(function () {
        characteristics = getUserCharacteristics(account);
        for (var i = 0; i < characteristics.length; i++) {
            var characteristic = characteristics[i];
            $("#characteristics").append(toProfileCard(characteristic.id, characteristic.profile));
        }

        var tagStatistics = [];
        for (var i = 0; i < characteristics.length; i++) {
            var characteristic = characteristics[i];
            $("#characteristic-" + characteristic.id + "-edit")[0].addEventListener("click", linkEdit);
            $("#characteristic-" + characteristic.id + "-view")[0].addEventListener("click", linkView);
            $("#characteristic-" + characteristic.id + "-export")[0].addEventListener("click", expoetCharacteristic);

            var tags = toTags(characteristic.profile.tag);
            for (var i = 0; i < tags.length; i++) {
                var tag = tagStatistics.find((v) => v.name == tags[i]);
                if (tag) tag.value += 1;
                else tagStatistics.push({ name: tags[i], value: 1 });
            }
        }

        for (var i = 0; i < tagStatistics.length; i++) {
            $("#tags").append(`<a class="ui label">${tagStatistics[i].name} ${tagStatistics[i].value}</a>`);
        }
        $("#tags a.label").on("click", function(){
            $(this).toggleClass("blue");
        })
    }, 10);
};

account = getLoginAccount();

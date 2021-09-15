function dice(i) {
    return Math.floor(Math.random() * i) + 1;
}
function diceRoll(x, y) {
    var results = [];
    var resultSum = 0;
    for (let i = 0; i < x; i++) {
        var result = dice(y);
        results.push(result.toString()); 
        resultSum += result;  
    }
    
    $.uiAlert({
        textHead: "Dice Roll!",
        text: `${x}D${y} > ${results.join(', ')} > ${resultSum}`,
        bgcolor: "#272b30",
        textcolor: "#fff",
        position: "top-right",
        icon: "",
        time: 3,
    });
    return 
    return Math.floor(Math.random() * i) + 1;
}
function emptyBy(value, str) {
    return !value ? str : value;
}
function getParam(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
}
function setParam(name, value) {
    var url = new URL(window.location.href);
    value = value.toString();
    if (!url.searchParams.get(name)) {
        url.searchParams.append(name, value);
        location.href = url;
    } else if (url.searchParams.get(name) != value) {
        url.searchParams.set(name, value);
        location.href = url;
    }
}
function sha256(str) {
    return str;
}
function toTags(str) {
    return str.replaceAll("　", " ").split(" ");
}

function initAccount(account) {
    $("#account-name")[0].innerText = account.name;
    if (account.id == 0) {
        $("#account-recommendation").show();
        $("#account-sign-out").hide();
        $("#account-sign-in").show();
        $("#characteristic-save-menu").hide();
    } else {
        $("#account-recommendation").hide();
        $("#account-sign-in").hide();
        $("#account-sign-out").show();
        $("#characteristic-save-menu").show();
    }
}
function initSigns() {
    $("#account-sign-in")[0].addEventListener("click", function (e) {
        $(".ui.account-sign-up").hide();
        $(".ui.account-sign-in").show();
        $(".ui.account.modal").modal({ duration: 200 }).modal("show");
    });
    $("#account-sign-out")[0].addEventListener("click", function (e) {
        account = signOut();
        initAccount(account);
    });

    $("#account-sign-in-send")[0].addEventListener("click", function (e) {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        account = signIn(username, password);
        if (account) {
            $(".ui.account.modal").modal({ duration: 200 }).modal("hide");
            initAccount(account);
        }
    });
    $('input[name="password"]').keypress(function (e) {
        if (e.keyCode == 13) {
            var username = $('input[name="username"]').val();
            var password = $('input[name="password"]').val();
            account = signIn(username, password);
            if (account) {
                $(".ui.account.modal").modal({ duration: 200 }).modal("hide");
                initAccount(account);
            }
            return false;
        }
    });
    $("#account-sign-up-send")[0].addEventListener("click", function (e) {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var passwordConfirm = $('input[name="password-confirm"]').val();
        account = signUp(username, password, passwordConfirm);
        if (account) {
            $(".ui.account.modal").modal({ duration: 200 }).modal("hide");
            initAccount(account);
        }
    });
    $("#account-sign-in-switch")[0].addEventListener("click", function (e) {
        $(".ui.account-sign-up").hide();
        $(".ui.account-sign-in").show();
    });
    $("#account-sign-up-switch")[0].addEventListener("click", function (e) {
        $(".ui.account-sign-in").hide();
        $(".ui.account-sign-up").show();
    });
}

function notifySucces(text, icon) {
    $.uiAlert({
        textHead: "Succes!",
        text: text,
        bgcolor: "#2185d0",
        textcolor: "#fff",
        position: "top-right",
        icon: icon + " icon",
        time: 1,
    });
}
function notifyFailure(text, icon) {
    $.uiAlert({
        textHead: "Failure!",
        text: text,
        bgcolor: "#db2828",
        textcolor: "#fff",
        position: "top-right",
        icon: icon + " icon",
        time: 2,
    });
}

function exportChatpalete(characteristic, isSpendLuck) {
    var san = characteristic.parameter.san;
    var str = characteristic.parameter.str + characteristic.parameter.strGrow;
    var con = characteristic.parameter.con + characteristic.parameter.conGrow;
    var pow = characteristic.parameter.pow + characteristic.parameter.powGrow;
    var dex = characteristic.parameter.dex + characteristic.parameter.dexGrow;
    var app = characteristic.parameter.app + characteristic.parameter.appGrow;
    var siz = characteristic.parameter.siz + characteristic.parameter.sizGrow;
    var int = characteristic.parameter.int + characteristic.parameter.intGrow;
    var edu = characteristic.parameter.edu + characteristic.parameter.eduGrow;
    var ide = characteristic.parameter.getIde() + characteristic.parameter.ideGrow;
    var knw = characteristic.parameter.getKnw() + characteristic.parameter.knwGrow;
    var luk = characteristic.parameter.luk + characteristic.parameter.lukGrow;
    var commnads = "";

    commnads += `CC<={SAN} 【SAN値チェック】`;
    commnads += `\nCC<=${str} 【*STR】`;
    commnads += `\nCC<=${con} 【*CON】`;
    commnads += `\nCC<=${pow} 【*POW】`;
    commnads += `\nCC<=${dex} 【*DEX】`;
    commnads += `\nCC<=${app} 【*APP】`;
    commnads += `\nCC<=${siz} 【*SIZ】`;
    commnads += `\nCC<=${int} 【*INT】`;
    commnads += `\nCC<=${edu} 【*EDU】`;
    commnads += `\nCC<=${ide} 【*アイデア】`;
    commnads += `\nCC<=${knw} 【*知識】`;
    if (isSpendLuck) {
        commnads += `\nCC<={幸運} 【幸運】`;
    } else {
        commnads += `\nCC<=${luk} 【*幸運】`;
    }
    commnads += "\n";
    for (var i = 0; i < characteristic.skills.length; i++) {
        var skill = characteristic.skills[i];
        commnads += `\nCC<=${skill.init + skill.job + skill.interest + skill.grow + skill.other} 【${skill.name}】`;
    }

    commnads += "\n";
    for (var i = 0; i < characteristic.weapons.length; i++) {
        var weapon = characteristic.weapons[i];
        var range = weapon.range ? ` 射程:${weapon.range}` : "";
        var attacks = weapon.attacks ? ` 回数:${weapon.attacks}` : "";
        var elastic = weapon.elastic ? ` 装弾数:${weapon.elastic}` : "";
        var failure = weapon.failure ? ` 故障:${weapon.failure}` : "";
        commnads += `${i == 0 ? "" : "\n"}【武器:${weapon.name}` + range + attacks + elastic + failure + "】";
        commnads += `\nCC<=${weapon.rate} 【${weapon.name}】`;
        if (weapon.damage) {
            if(weapon.attacks.startsWith("フル") || weapon.attacks.startsWith("ﾌﾙ")){
                commnads += `\nFAR(${weapon.elastic},${weapon.rate},${weapon.failure},0,e,) 【${weapon.name}】`;
            }
            commnads += `\n${weapon.damage.toLowerCase().replace("db", characteristic.parameter.getDb())} 【${weapon.name}DMG】`;
        }
    }
    return commnads;
}


function getCcfoliaClipboardCharacteristic(characteristic) {
    var isLuk = $("#characteristic-export-commands-copy-ccfolia-luk")[0].checked;
    var isParametor = $("#characteristic-export-commands-copy-ccfolia-parametor")[0].checked;
    var isSecret = $("#characteristic-export-commands-copy-ccfolia-secret")[0].checked;
    var isInvisible = $("#characteristic-export-commands-copy-ccfolia-invisible")[0].checked;
    var isHideStatus = $("#characteristic-export-commands-copy-ccfolia-hideStatus")[0].checked;

    var name = characteristic.profile.name + (characteristic.profile.kana ? `(${characteristic.profile.kana})` : "");

    var hp = characteristic.parameter.getHp() + characteristic.parameter.hpGrow;
    var mp = characteristic.parameter.getMp() + characteristic.parameter.mpGrow;
    var san = characteristic.parameter.san;
    var luk = characteristic.parameter.luk + characteristic.parameter.lukGrow;

    var str = characteristic.parameter.str + characteristic.parameter.strGrow;
    var con = characteristic.parameter.con + characteristic.parameter.conGrow;
    var pow = characteristic.parameter.pow + characteristic.parameter.powGrow;
    var dex = characteristic.parameter.dex + characteristic.parameter.dexGrow;
    var app = characteristic.parameter.app + characteristic.parameter.appGrow;
    var siz = characteristic.parameter.siz + characteristic.parameter.sizGrow;
    var int = characteristic.parameter.int + characteristic.parameter.intGrow;
    var edu = characteristic.parameter.edu + characteristic.parameter.eduGrow;
    var ide = characteristic.parameter.getIde() + characteristic.parameter.ideGrow;
    var knw = characteristic.parameter.getKnw() + characteristic.parameter.knwGrow;
    var bld = characteristic.parameter.getBld();
    var db = characteristic.parameter.getDb();
    var mov = characteristic.parameter.getMov();

    var ccfoliaCharacteristic = {
        kind: "character",
        data: {
            active: true,
            secret: isSecret,
            invisible: isInvisible,
            hideStatus: isHideStatus,
            name: name,
            initiative: dex,
            status: [
                { label: "HP", value: hp, max: hp },
                { label: "MP", value: mp, max: mp },
                { label: "SAN", value: san, max: san },
            ],
            params: [],
            commands: exportChatpalete(characteristic, isLuk),
        },
    };

    if (isLuk) {
        ccfoliaCharacteristic.data.status.push({ label: "幸運", value: luk, max: luk });
    }
    if (isParametor) {
        var luk = characteristic.parameter.luk + characteristic.parameter.lukGrow;
        ccfoliaCharacteristic.data.params = [
            { label: "STR", value: str.toString() },
            { label: "CON", value: con.toString() },
            { label: "POW", value: pow.toString() },
            { label: "DEX", value: dex.toString() },
            { label: "APP", value: app.toString() },
            { label: "SIZ", value: siz.toString() },
            { label: "INT", value: int.toString() },
            { label: "EDU", value: edu.toString() },
            { label: "ビルド", value: bld.toString() },
            { label: "DB", value: db.toString() },
            { label: "MOV", value: mov.toString() },
        ];
    }

    return ccfoliaCharacteristic;
}
function writeClipboard(str) {
    if (navigator.clipboard) {
        try {
            navigator.clipboard.writeText(str);
            notifySucces("クリップボードにコピーしました。", "clipboard check");
        } catch (err) {
            console.log(err);
            notifyFailure("クリップボードのコピーに失敗しました。", "exclamation triangle");
        }
    }
}
function override(characteristic){
    characteristic.parameter.getIde = function () {
        return this.int + this.intGrow;
    };
    characteristic.parameter.getKnw = function () {
        return this.edu + this.eduGrow;
    };
    characteristic.parameter.getBld = function () {
        var v = this.str + this.siz;
        if (v < 65) return -2;
        else if (v < 85) return -1;
        else if (v < 125) return 0;
        else if (v < 165) return 1;
        else if (v < 205) return 2;
        else if (v < 285) return 3;
        else if (v < 365) return 4;
        else if (v < 445) return 5;
        else if (v < 525) return 6;
        else {
            return Math.floor((v - 525) / 80) + 6;
        }
    };
    characteristic.parameter.getDb = function () {
        var v = this.str + this.siz;
        if (v < 65) return -2;
        else if (v < 85) return -1;
        else if (v < 125) return 0;
        else if (v < 165) return "1D4";
        else if (v < 205) return "1D6";
        else if (v < 285) return "2D6";
        else if (v < 365) return "3D6";
        else if (v < 445) return "4D6";
        else if (v < 525) return "5D6";
        else {
            var d = Math.floor((v - 525) / 80) + 5;
            return "" + d + "D6";
        }
    };
    characteristic.parameter.getHp = function () {
        return Math.floor((this.con + this.siz) / 10);
    };
    characteristic.parameter.getMp = function () {
        return Math.floor(this.pow / 5);
    };
    characteristic.parameter.getMov = function () {
        if (this.dex < this.siz && this.str < this.siz) return 7;
        else if (this.dex > this.siz && this.str > this.siz) return 9;
        else return 8;
    };
    characteristic.parameter.getJobPoint = function (jobPointsCalculation) {
        var exp = emptyBy(jobPointsCalculation, "EDU×4")
            .replaceAll("×", "*")
            .toLowerCase()
            .replace("edu", this.edu + this.eduGrow)
            .replace("str", this.str + this.strGrow)
            .replace("con", this.con + this.conGrow)
            .replace("pow", this.pow + this.powGrow)
            .replace("dex", this.dex + this.dexGrow)
            .replace("siz", this.siz + this.sizGrow)
            .replace("app", this.app + this.appGrow);
        return eval(exp);
    };
    characteristic.parameter.getInterestPoint = function () {
        return this.int * 2;
    };

    return characteristic;
}

function getLoginAccount() {
    var account = $.cookie("account");
    return account ? JSON.parse(account) : { id: 0, name: "Guest" };
}
function signIn(username, password) {
    try {
        var account = getAccount(username, password);
        if (account) {
            $.cookie("account", JSON.stringify(account), { expires: 7 });
            notifySucces("ログインしました。", "sign-in");
            return account;
        } else {
            notifyFailure("ユーザ名かパスワードが間違っています。", "exclamation triangle");
        }
    } catch (err) {
        console.log(err);
        notifyFailure("ログインに失敗しました。", "exclamation triangle");
    }
    return;
}
function signUp(username, password, passwordConfirm) {
    try {
        if (password != passwordConfirm) {
            notifyFailure("パスワードが一致していません。", "exclamation triangle");
            return;
        }
        if (checkUsernameDuplicate(username)) {
            notifyFailure("このユーザ名は存在しています。", "exclamation triangle");
            return;
        }

        var account = saveAccount(username, password);
        $.cookie("account", JSON.stringify(account), { expires: 7 });
        notifySucces("新規作成完了しました。", "sign-up");
        return account;
    } catch (err) {
        console.log(err);
        notifyFailure("ログインに失敗しました。", "exclamation triangle");
    }
    return;
}
function signOut() {
    try {
        var account = getLoginAccount();
        if (account.id != 0) {
            $.removeCookie("account");
            notifySucces("ログアウトしました。", "sign-out");
            return getLoginAccount();
        }
    } catch (err) {
        console.log(err);
        notifyFailure("ログアウトに失敗しました。", "exclamation triangle");
    }
    return;
}
function getEmptyCharacteristic(account) {
    try {
        var characteristicId = createCharacteristic(account);
        return getInitCharacteristic(characteristicId, account.token);
    } catch (err) {
        console.log(err);
        notifyFailure("新規データ作成を開始できませんでした。", "exclamation triangle");
    }
    return;
}
function getEditingCharacteristic(account, characteristicId) {
    try {
        var characteristic = getCharacteristic(characteristicId);
        return override( characteristic && !characteristic.isEmpty ? characteristic : getInitCharacteristic(characteristicId, account.token));
    } catch (err) {
        console.log(err);
        notifyFailure("キャラクターデータの読み込みに失敗しました。", "exclamation triangle");
    }
    return;
}
function getInitCharacteristic(id, token) {
    var json =
        '{"id":' +
        id +
        ',"token":"' +
        token +
        '","isEmpty":false,"profile":{"name":"","kana":"","tag":"","job":"","age":"","gender":"","height":"","weight":"","origin":"","hairColor":"","eyeColor":"","skinColor":"","image":"./images/wireframe.png"},"parameter":{"str":0,"con":0,"siz":0,"dex":0,"app":0,"int":0,"pow":0,"edu":0,"luk":0,"ide":0,"knw":0,"hp":0,"mp":0,"strGrow":0,"conGrow":0,"sizGrow":0,"dexGrow":0,"appGrow":0,"intGrow":0,"powGrow":0,"eduGrow":0,"lukGrow":0,"ideGrow":0,"knwGrow":0,"hpGrow":0,"mpGrow":0,"san":0,"jobPoints":0,"jobPointsCorrection":0,"interestPointsCorrection":0},"skills":[{"category":"combat","id":1,"name":"回避","init":0,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"combat","id":2,"name":"近接戦闘(格闘)","init":25,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"combat","id":3,"name":"近接戦闘(斧)","init":15,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"combat","id":4,"name":"近接戦闘(刀剣)","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"combat","id":5,"name":"投擲","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"combat","id":6,"name":"射撃(拳銃)","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"combat","id":7,"name":"射撃(L/SG)","init":25,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"combat","id":8,"name":"砲術","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":1,"name":"目星","init":25,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":2,"name":"聞き耳","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":3,"name":"応急手当","init":30,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":4,"name":"図書館","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":5,"name":"隠密","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":6,"name":"精神分析","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":7,"name":"鍵開け","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":8,"name":"手さばき","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":9,"name":"追跡","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":10,"name":"登擧","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":11,"name":"鑑定","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"search","id":12,"name":"読唇術","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":1,"name":"運転","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":2,"name":"機械修理","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":3,"name":"重機械操作","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":4,"name":"乗馬","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":5,"name":"水泳","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":6,"name":"操縦","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":7,"name":"ダイビング","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":8,"name":"跳躍","init":20,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":9,"name":"電気修理","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":10,"name":"ナビゲート","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":11,"name":"爆破","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":12,"name":"催眠術","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":13,"name":"変装","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"action","id":14,"name":"動物使い","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"negotiation","id":1,"name":"信用","init":0,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"negotiation","id":2,"name":"言いくるめ","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"negotiation","id":3,"name":"説得","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"negotiation","id":4,"name":"威圧","init":15,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"negotiation","id":5,"name":"魅惑","init":15,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"negotiation","id":6,"name":"母国語","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"negotiation","id":7,"name":"言語","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":1,"name":"医学","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":2,"name":"オカルト","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":3,"name":"クトゥルフ神話","init":0,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":4,"name":"芸術/製作","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":5,"name":"経理","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":6,"name":"考古学","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":7,"name":"コンピューター","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":8,"name":"科学","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":9,"name":"心理学","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":10,"name":"人類学","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":11,"name":"電子工学","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":12,"name":"自然","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":13,"name":"法律","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":14,"name":"歴史","init":5,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":15,"name":"伝承","init":1,"job":0,"interest":0,"grow":0,"other":0,"editable":false},{"category":"knowledge","id":16,"name":"サバイバル","init":10,"job":0,"interest":0,"grow":0,"other":0,"editable":false}],"weapons":[{"category":"weapon","id":1,"name":"素手","rate":0,"rateSkillName":"近接戦闘(格闘)","damage":"1d3+db","range":"0","attacks":"1","elastic":"","failure":"","editable":false}],"equips":[],"money":{"pocket":0,"cash":0,"assets":0},"backstory":{"personalDescription":"","ideologyOrBeliefs":"","significantPeople":"","meaningfulLocations":"","treasuredPossessions":"","traits":"","injuriesAndScars":"","phobiasAndManias":"","spellsAndArtifacts":"","encounters":""},"memo":""}';
    return override(JSON.parse(json));
}
function saveEditingCharacteristic(account, characteristic) {
    try {
        var characteristic = saveCharacteristic(account, characteristic);
        notifySucces("保存しました。", "save check");
        return characteristic;
    } catch (err) {
        console.log(err);
        notifyFailure("保存に失敗しました。", "exclamation triangle");
    }
}
function getUserCharacteristics(account) {
    try {
        var characteristics = getCharacteristics(account);
        return characteristics;
    } catch (err) {
        console.log(err);
        notifyFailure("キャラクターデータの読み込みに失敗しました。", "exclamation triangle");
    }
    return;
}

function getAccount(username, password) {
    if (!localStorage.accounts) {
        localStorage.accounts = JSON.stringify([{ id: 999, name: "admin", password: "admin" }]);
    }
    var accounts = JSON.parse(localStorage.accounts);
    return accounts.find((v) => v.name == username && v.password == password);
}
function checkUsernameDuplicate(username) {
    if (!localStorage.accounts) {
        localStorage.accounts = JSON.stringify([{ id: 999, name: "admin", password: "admin" }]);
    }

    var accounts = JSON.parse(localStorage.accounts);
    return accounts.find((v) => v.name == username);
}
function saveAccount(username, password) {
    if (!localStorage.accounts) {
        localStorage.accounts = JSON.stringify([{ id: 999, name: "admin", password: "admin" }]);
    }

    var accounts = JSON.parse(localStorage.accounts);
    var id = 0;
    for (var i = 0; i < accounts.length; i++) {
        id = Math.max(accounts[i].id, id);
    }
    var token = sha256(new Date().toUTCString());
    var account = { id: id + 1, name: username, password: password, token: token };
    accounts.push(account);
    localStorage.accounts = JSON.stringify(accounts);
    return account;
}
function createCharacteristic(account) {
    if (!localStorage.characteristics) {
        localStorage.characteristics = JSON.stringify([]);
    }

    var characteristics = JSON.parse(localStorage.characteristics);
    var id = 0;
    for (var i = 0; i < characteristics.length; i++) {
        id = Math.max(characteristics[i].id, id);
    }
    characteristics.push({ id: id + 1, token: account.token, isEmpty: true });
    localStorage.characteristics = JSON.stringify(characteristics);
    return id + 1;
}
function getCharacteristic(characteristicId) {
    if (!localStorage.characteristics) {
        localStorage.characteristics = JSON.stringify([]);
    }
    var characteristics = JSON.parse(localStorage.characteristics);
    return characteristics.find((v) => v.id == characteristicId);
}
function saveCharacteristic(account, characteristic) {
    if (!localStorage.characteristics) {
        localStorage.characteristics = JSON.stringify([]);
    }

    var characteristics = JSON.parse(localStorage.characteristics);
    var oldCharacteristicId = characteristics.findIndex((v) => v.id == characteristic.id);
    if (oldCharacteristicId < 0) {
        var id = 0;
        for (var i = 0; i < characteristics.length; i++) {
            id = Math.max(characteristics[i].id, id);
        }
        characteristic.id = id + 1;
        characteristic.token = account.token;
        characteristics.push(characteristic);
    } else {
        characteristics[oldCharacteristicId] = characteristic;
    }
    localStorage.characteristics = JSON.stringify(characteristics);
    return characteristic;
}
function getCharacteristics(account) {
    if (!localStorage.characteristics) {
        localStorage.characteristics = JSON.stringify([]);
    }
    s_characteristics = JSON.parse(localStorage.characteristics);

    var characteristics = [];
    for (var i = 0; i < s_characteristics.length; i++) {
        var characteristic = s_characteristics[i];
        if(characteristic.isEmpty) continue;
        characteristics.push(characteristic);
    }
    
    return characteristics;
}

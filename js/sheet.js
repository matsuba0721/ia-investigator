window.onload = function () {
    var data = new Object();
    data.init = function () {
        this.str = 0;
        this.strGrow = 0;
        this.con = 0;
        this.conGrow = 0;
        this.siz = 0;
        this.sizGrow = 0;
        this.dex = 0;
        this.dexGrow = 0;
        this.app = 0;
        this.appGrow = 0;
        this.int = 0;
        this.intGrow = 0;
        this.pow = 0;
        this.powGrow = 0;
        this.edu = 0;
        this.eduGrow = 0;
        this.luk = 0;
        this.lukGrow = 0;
        this.ide = 0;
        this.ideGrow = 0;
        this.knw = 0;
        this.knwGrow = 0;
        this.hp = 0;
        this.hpGrow = 0;
        this.mp = 0;
        this.mpGrow = 0;

        this.san = 0;

        this.jobPointsCalculation = "";
        this.jobPointsCorrection = 0;
        this.interestPointsCorrection = 0;

        this.skills = [];
    };
    data.getIde = function () {
        return data.int + data.intGrow;
    };
    data.getKnw = function () {
        return data.edu + data.eduGrow;
    };
    data.getBld = function () {
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
    data.getDb = function () {
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
    data.getHp = function () {
        return Math.floor((this.con + this.siz) / 10);
    };
    data.getMp = function () {
        return Math.floor(this.pow / 5);
    };
    data.getMov = function () {
        if (this.dex < this.siz && this.str < this.siz) return 7;
        else if (this.dex > this.siz && this.str > this.siz) return 9;
        else return 8;
    };
    data.getJobPoint = function () {
        var exp = emptyBy(this.jobPointsCalculation, "EDU×4").replaceAll("×", "*").toLowerCase().replace("edu", this.edu).replace("str", this.str).replace("con", this.con).replace("pow", this.pow).replace("dex", this.dex).replace("siz", this.siz).replace("app", this.app);
        return eval(exp);
    };
    data.getInterestPoint = function () {
        return this.int * 2;
    };
    data.getAvd = function () {
        return Math.floor(this.dex / 2);
    };
    data.calc = function () {
        this.bld = this.getBld();
        this.db = this.getDb();
        this.hp = this.getHp();
        this.mp = this.getMp();
        this.mov = this.getMov();
        this.avd = this.getAvd();

        this.san = this.pow;
    };
    data.randomStatus = function () {
        this.str = (dice(6) + dice(6) + dice(6)) * 5;
        this.con = (dice(6) + dice(6) + dice(6)) * 5;
        this.pow = (dice(6) + dice(6) + dice(6)) * 5;
        this.dex = (dice(6) + dice(6) + dice(6)) * 5;
        this.app = (dice(6) + dice(6) + dice(6)) * 5;
        this.siz = (dice(6) + dice(6) + 6) * 5;
        this.int = (dice(6) + dice(6) + 6) * 5;
        this.edu = (dice(6) + dice(6) + 6) * 5;
        this.luk = (dice(6) + dice(6) + dice(6)) * 5;

        this.san = this.pow;

        this.strGrow = 0;
        this.conGrow = 0;
        this.sizGrow = 0;
        this.dexGrow = 0;
        this.appGrow = 0;
        this.intGrow = 0;
        this.powGrow = 0;
        this.eduGrow = 0;
        this.lukGrow = 0;

        this.ideGrow = 0;
        this.knwGrow = 0;
        this.hpGrow = 0;
        this.mpGrow = 0;

        this.jobPointsCalculation = "EDU×4";
        this.jobPointsCorrection = 0;
        this.interestPointsCorrection = 0;
    };

    function viewUpdate() {
        $("#param-str-present")[0].value = data.str + data.strGrow;
        $("#param-con-present")[0].value = data.con + data.conGrow;
        $("#param-pow-present")[0].value = data.pow + data.powGrow;
        $("#param-dex-present")[0].value = data.dex + data.dexGrow;
        $("#param-app-present")[0].value = data.app + data.appGrow;
        $("#param-siz-present")[0].value = data.siz + data.sizGrow;
        $("#param-int-present")[0].value = data.int + data.intGrow;
        $("#param-edu-present")[0].value = data.edu + data.eduGrow;
        $("#param-luk-present")[0].value = data.luk + data.lukGrow;
        $("#param-ide")[0].value = data.getIde();
        $("#param-ide-present")[0].value = data.getIde() + data.ideGrow;
        $("#param-knw")[0].value = data.getKnw();
        $("#param-knw-present")[0].value = data.getKnw() + data.knwGrow;
        $("#param-hp")[0].value = data.getHp();
        $("#param-hp-present")[0].value = data.getHp() + data.hpGrow;
        $("#param-mp")[0].value = data.getMp();
        $("#param-mp-present")[0].value = data.getMp() + data.mpGrow;
        $("#param-san-indefinite")[0].innerText = parseInt(data.san * 0.8);
        $("#param-bld")[0].value = data.getBld();
        $("#param-db")[0].value = data.getDb();
        $("#param-mov")[0].value = data.getMov();
        $("#param-job-points")[0].value = data.getJobPoint();
        $("#param-job-points-present")[0].value = data.getJobPoint() + data.jobPointsCorrection;
        $("#param-interest-points")[0].value = data.getInterestPoint();
        $("#param-interest-points-present")[0].value = data.getInterestPoint() + data.interestPointsCorrection;
    }

    function dice(i) {
        return Math.floor(Math.random() * i) + 1;
    }
    function emptyBy(value, str) {
        return !value ? str : value;
    }

    function calculateStatus(e) {
        var param = e.path[0].id.replace("param-", "").replace("-grow", "");
        eval("data." + param + "=" + emptyBy($("#param-" + param)[0].value, "0"));
        eval("data." + param + "Grow=" + emptyBy($("#param-" + param + "-grow")[0].value, "0"));
        $("#param-" + param + "-present")[0].value = eval("data." + param + "+" + "data." + param + "Grow");

        viewUpdate();
    }

    $("#param-str")[0].addEventListener("input", calculateStatus);
    $("#param-str-grow")[0].addEventListener("input", calculateStatus);
    $("#param-con")[0].addEventListener("input", calculateStatus);
    $("#param-con-grow")[0].addEventListener("input", calculateStatus);
    $("#param-pow")[0].addEventListener("input", calculateStatus);
    $("#param-pow-grow")[0].addEventListener("input", calculateStatus);
    $("#param-dex")[0].addEventListener("input", calculateStatus);
    $("#param-dex-grow")[0].addEventListener("input", calculateStatus);
    $("#param-app")[0].addEventListener("input", calculateStatus);
    $("#param-app-grow")[0].addEventListener("input", calculateStatus);
    $("#param-siz")[0].addEventListener("input", calculateStatus);
    $("#param-siz-grow")[0].addEventListener("input", calculateStatus);
    $("#param-int")[0].addEventListener("input", calculateStatus);
    $("#param-int-grow")[0].addEventListener("input", calculateStatus);
    $("#param-edu")[0].addEventListener("input", calculateStatus);
    $("#param-edu-grow")[0].addEventListener("input", calculateStatus);
    $("#param-luk")[0].addEventListener("input", calculateStatus);
    $("#param-luk-grow")[0].addEventListener("input", calculateStatus);
    $("#param-ide")[0].addEventListener("input", calculateStatus);
    $("#param-ide-grow")[0].addEventListener("input", calculateStatus);
    $("#param-knw")[0].addEventListener("input", calculateStatus);
    $("#param-knw-grow")[0].addEventListener("input", calculateStatus);
    $("#param-hp")[0].addEventListener("input", calculateStatus);
    $("#param-hp-grow")[0].addEventListener("input", calculateStatus);
    $("#param-mp")[0].addEventListener("input", calculateStatus);
    $("#param-mp-grow")[0].addEventListener("input", calculateStatus);
    $("#param-san")[0].addEventListener("input", function (e) {
        data.san = parseInt($("#param-san")[0].value);
        viewUpdate();
    });
    $("#param-job-points-calculation")[0].addEventListener("change", function (e) {
        data.jobPointsCalculation = $("#param-job-points-calculation")[0].value;
        viewUpdate();
    });
    $("#param-job-points-correction")[0].addEventListener("input", function (e) {
        eval("data.jobPointsCorrection=" + emptyBy($("#param-job-points-correction")[0].value, "0"));
        viewUpdate();
    });
    $("#param-interest-points-correction")[0].addEventListener("input", function (e) {
        eval("data.interestPointsCorrection=" + emptyBy($("#param-interest-points-correction")[0].value, "0"));
        viewUpdate();
    });

    $("#randam-generate-status").on("click", function () {
        data.randomStatus();
        $("#param-str")[0].value = data.str;
        $("#param-str-grow")[0].value = data.strGrow;
        $("#param-con")[0].value = data.con;
        $("#param-con-grow")[0].value = data.conGrow;
        $("#param-pow")[0].value = data.pow;
        $("#param-pow-grow")[0].value = data.powGrow;
        $("#param-dex")[0].value = data.dex;
        $("#param-dex-grow")[0].value = data.dexGrow;
        $("#param-app")[0].value = data.app;
        $("#param-app-grow")[0].value = data.appGrow;
        $("#param-siz")[0].value = data.siz;
        $("#param-siz-grow")[0].value = data.sizGrow;
        $("#param-int")[0].value = data.int;
        $("#param-int-grow")[0].value = data.intGrow;
        $("#param-edu")[0].value = data.edu;
        $("#param-edu-grow")[0].value = data.eduGrow;
        $("#param-luk")[0].value = data.luk;
        $("#param-luk-grow")[0].value = data.lukGrow;
        $("#param-ide-grow")[0].value = data.ideGrow;
        $("#param-knw-grow")[0].value = data.knwGrow;
        $("#param-hp-grow")[0].value = data.hpGrow;
        $("#param-mp-grow")[0].value = data.mpGrow;
        $("#param-san")[0].value = data.san;
        $("#param-job-points-correction")[0].value = data.jobPointsCorrection;
        $("#param-interest-points-correction")[0].value = data.interestPointsCorrection;

        viewUpdate();
    });

    $(".ui.dropdown").dropdown();
    $(".ui.accordion").accordion();

    data.init();
    viewUpdate();
};

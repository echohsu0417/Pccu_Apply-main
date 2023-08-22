function checkPasswordInput () {
    var pass = $("#PassChangeChecked").prop('checked');
    if (!pass) {
        $("#UserPassword").val("");
        $("#UserPassword").prop('disabled', true);
        $("#ConfirmPassword").val("");
        $("#ConfirmPassword").prop('disabled', true);
        return true;
    }
    $("#UserPassword").prop('disabled', false);
    $("#ConfirmPassword").prop('disabled', false);

    return true;
}

function passwordChanged() {
    var pass = $("#UserPassword").val();
    // check upper case
    var regex = /[A-Z]/g;
    var found = pass.match(regex);
    var test = $("#passwordUpcase");

    if (test && found) {
        if (test.hasClass("notic uncheck")) test.removeClass("notic uncheck");
        if (!test.hasClass("notic checked")) test.addClass("notic checked");
    }
    else if (test && !found) {
        if (test.hasClass("notic checked")) test.removeClass("notic checked");
        if (!test.hasClass("notic uncheck")) test.addClass("notic uncheck");
    }

    // 英文字母小寫
    regex = /[a-z]/g;
    found = pass.match(regex);
    test = $("#passwordLowcase");
    if (test && found) {
        if (test.hasClass("notic uncheck")) test.removeClass("notic uncheck");
        if (!test.hasClass("notic checked")) test.addClass("notic checked");
    }
    else if (test && !found) {
        if (test.hasClass("notic checked")) test.removeClass("notic checked");
        if (!test.hasClass("notic uncheck")) test.addClass("notic uncheck");
    }

    // 數字
    regex = /[0-9]/g;
    found = pass.match(regex);
    test = $("#passwordDigit");
    if (test && found) {
        if (test.hasClass("notic uncheck")) test.removeClass("notic uncheck");
        if (!test.hasClass("notic checked")) test.addClass("notic checked");
    }
    else if (test && !found) {
        if (test.hasClass("notic checked")) test.removeClass("notic checked");
        if (!test.hasClass("notic uncheck")) test.addClass("notic uncheck");
    }

    // 特殊符號: !@#$%^&*---.%$^&*!_@+
    regex = /[.#%$^&*!_@+-]/g;
    found = pass.match(regex);
    test = $("#passwordSymbol");
    if (test && found) {
        if (test.hasClass("notic uncheck")) test.removeClass("notic uncheck");
        if (!test.hasClass("notic checked")) test.addClass("notic checked");
    }
    else if (test && !found) {
        if (test.hasClass("notic checked")) test.removeClass("notic checked");
        if (!test.hasClass("notic uncheck")) test.addClass("notic uncheck");
    }

    // 長度
    found = pass.length;
    test = $("#passwordLength");
    if (test && found >= 6) {
        if (test.hasClass("notic uncheck")) test.removeClass("notic uncheck");
        if (!test.hasClass("notic checked")) test.addClass("notic checked");
    }
    else if (test && found < 6) {
        if (test.hasClass("notic checked")) test.removeClass("notic checked");
        if (!test.hasClass("notic uncheck")) test.addClass("notic uncheck");
    }

}

function confirmContinuousProject() {
//    var answer = window.confirm("延續計畫申請會帶入新增計畫基本資料，確定開始新增？");
    var projectId = $('select#contProjectOption').val();

    $.ajax({
        async: false,    // wait until the request is finished! may cause the browser waiting
        url: '/Apply/AddContinuousProject',
        type: "Post",
        data: {
            //projectStatus: projectStatus
            //, currentPage: pageNumber
            //, pageSize: pageSize
            //, orderBy: sortBy
            contProjectId: projectId,
            '__RequestVerificationToken': function () { return $('input[name=__RequestVerificationToken]').val(); }
        },
        //cache: false,
        success: function (data) {
            window.location.href = "/Apply/EditProject/" + data;
            return;
        },
        error: function (ob, errStr) {
            alert("An error occured.Please try after sometime." + errStr);
        }
    });

    return;
}

function cancelContinuousProject() {
    var answer = window.confirm("放棄新增延續性計畫嗎?");
    if (answer) {
//        var searchString = $('input[name=SearchString]').val();
        window.location.href = "/Apply/ListProject";
        return;
    }
    return;
}

// 檢查因為選了 計畫模組，要改變允許的單位類型
//T01	技術創業放大器(TEA)
//T02	在地企業創新器(LEI)
//T03	國際創育加速器(ISA)
//T04	主題式國際創育加速器(FISA)
//T05	在地青年創育坊
//orgType[0].value	"C"	string
//orgType[0].checked	true	boolean
//orgType[0].checked	true	boolean
//orgType[0].disabled	false	boolean
//var orgType = $("input[name='OrganizationType']");
//var pass = $("#PassChangeChecked").prop('checked');
//$("#UserPassword").prop('disabled', true);
// C 公司/ O 法人/ S學校
// orgType.val()
function checkOrganizationType(planTypeCode) {
    var orgType = $("input[name='OrganizationType']");
    var isChecked = false;
    var defaultSelect = 0;
    var subtypeCode = document.getElementById("PlansubtypeT05");
    var planSubtypeCode = $("input[name='PlanSubtypeCode']");
    var featured = $("input[name='Featured']");

    // T01	技術創業放大器(TEA): O 法人/ S 學校
    // 檢查 checked  value 是否在 disabled 的選項上，若是，轉到預設
    if (planTypeCode == "T01") {
        for (var i = 0; i < orgType.length; i++) {
            orgType[i].disabled = orgType[i].value == 'C' ? true : false;
            if (orgType[i].value != 'C' && orgType[i].checked) isChecked = true;
            if (orgType[i].value == 'O') defaultSelect = i;
        }
        // 如果未選到，預設
        if (!isChecked) orgType[defaultSelect].checked = true;
        if ($('input#ApplyTypeU')[0].disabled) $('input#ApplyTypeU')[0].disabled = false;
        subtypeCode.style.display = "none";
        featured[1].disabled = false;

        // 變更可選的聯盟區域
        ///changeUnionCode();
       return;
    }

    //T02	在地企業創新器(LEI): O 法人/S 學校/ C 公司
    if (planTypeCode == "T02") {
        for (var i = 0; i < orgType.length; i++) {
            orgType[i].disabled = false;
        }
        if ($('input#ApplyTypeU')[0].disabled) $('input#ApplyTypeU')[0].disabled = false;

        subtypeCode.style.display = "none";
        featured[1].disabled = false;

        // 變更可選的聯盟區域
        ///changeUnionCode();
        return;
    }

    //T03	國際創育加速器(ISA): O 法人/ C 公司
    if (planTypeCode == "T03") {
        for (var i = 0; i < orgType.length; i++) {
            orgType[i].disabled =  orgType[i].value == 'S' ? true : false;
            if (orgType[i].value != 'S' && orgType[i].checked) isChecked = true;
            if (orgType[i].value == 'O') defaultSelect = i;
        }
        // 如果未選到，預設
        if (!isChecked) orgType[defaultSelect].checked = true;
        if ($('input#ApplyTypeU')[0].disabled) $('input#ApplyTypeU')[0].disabled = false;

        subtypeCode.style.display = "none";
        featured[1].disabled = false;

        // 變更可選的聯盟區域
        ///changeUnionCode();
        return;
    }

    //T04	主題式國際創育加速器(FISA): C 公司
    if (planTypeCode == "T04") {
        for (var i = 0; i < orgType.length; i++) {
            orgType[i].disabled = orgType[i].value != 'C' ? true : false;
           if (orgType[i].value == 'C') defaultSelect = i;
        }
        orgType[defaultSelect].checked = true;
        if ($('input#ApplyTypeU')[0].disabled) $('input#ApplyTypeU')[0].disabled = false;

        subtypeCode.style.display = "none";
        featured[1].disabled = false;

        // 變更可選的聯盟區域
        ///changeUnionCode();
        return;
    }

    //T05	在地青年創育坊: O 法人/C 公司
    if (planTypeCode == "T05") {
        for (var i = 0; i < orgType.length; i++) {
            orgType[i].disabled = orgType[i].value == 'S' ? true : false;
            if (orgType[i].value != 'S' && orgType[i].checked) isChecked = true;
            if (orgType[i].value == 'O') defaultSelect = i;
        }
        // 如果未選到，預設
        if (!isChecked) orgType[defaultSelect].checked = true;

        // 只能個別申請，創意聯盟要 disabled  ApplyType
        $('input#ApplyTypeU')[0].disabled = true;
        $('input#ApplyTypeI')[0].disabled = false;
        $('input#ApplyTypeI')[0].checked = true;

        subtypeCode.style.display = "block";
        if (!planSubtypeCode[1].checked) planSubtypeCode[0].checked = true;

        ///新增申請特色加值項目-物聯網設定
        featured[0].checked = true;
        featured[1].checked = false;
        featured[1].disabled = true;

        // 變更可選的聯盟區域
        ///changeUnionCode();
        return;
    }

    //T06	企業加速器: C 公司
    if (planTypeCode == "T06") {
        for (var i = 0; i < orgType.length; i++) {
            orgType[i].disabled = orgType[i].value != 'C' ? true : false;
            if (orgType[i].value == 'C') defaultSelect = i;
        }
        orgType[defaultSelect].checked = true;
        if ($('input#ApplyTypeU')[0].disabled) $('input#ApplyTypeU')[0].disabled = false;

        subtypeCode.style.display = "none";
        featured[1].disabled = false;

        // 變更可選的聯盟區域
        ///changeUnionCode();
        return;
    }

}

function checkFeatures(ans) {
    ///無申請特色加值項目-物聯網設定
    var featured = $("input[name='Featured']");
    if (ans == "Y") {   // 法人
        featured[0].disabled = false;
        featured[1].disabled = false;
    }
    else {  // 學校
        featured[0].checked = true;
        featured[1].checked = false;
        featured[1].disabled = true;
    }

    return;
}

// 依據計畫模組及申請方式，變更區域創意聯盟可選的項目
// 只有選「在地企業創新器」，再選「創育聯盟」選項時， 北中南東等選項才能選；
//未選擇「在地企業創新器」者，皆 disabled，預設帶無
function changeUnionCode() {
    var planType = $("input[name='PlanTypeCode']:checked").val();
    var applyType = $("input[name='ApplyType']:checked").val();

    if (planType == 'T02' && applyType == 'U') {
        $('input[name="UnionCode"]').each(function() {
            $(this)[0].disabled = false;
        });
    }
    else {
        $('input[name="UnionCode"]').each(function () {
            $(this)[0].disabled = true;
        });
        $('input#UnionCodeNone')[0].disabled = false;
        $('input#UnionCodeNone')[0].checked = true;
    }
}

// 取得查詢條件重新查詢
// criteria='page', 'status'
// 查詢條件有 3 個: status, page, pageSize
function applySearch(criteria, val) {
    var projectGroup;
    var pageNumber;
    var pageSize;
    var sortBy;

    // 取 status
    if (criteria == 'status') {
        projectGroup = val;
    }
    else {
        var objid = $(".tag .checked")[0].id;
        if (objid == "projectGroupAll") projectGroup = 0;
        else if (objid == "projectGroup1") projectGroup = 1;
        else if (objid == "projectGroup2") projectGroup = 2;
        else if (objid == "projectGroup3") projectGroup = 3;
        else if (objid == "projectGroup4") projectGroup = 4;
        else if (objid == "projectGroup5") projectGroup = 5;
        else if (objid == "projectGroup6") projectGroup = 6;
        else if (objid == "projectGroup7") projectGroup = 7;
        else if (objid == "projectGroup8") projectGroup = 8;
        else if (objid == "projectGroup9") projectGroup = 9;
    }

    // 取pageNumber
    if (criteria == 'page') {
        pageNumber = val;
    }
    else {
        pageNumber = 1;
    }

    // 取 pageSize
    if (criteria == 'pagesize') {
        pageSize = val;
    }
    else {
        pageSize = $('select#pageSize').val();
    }

    // 排序
    sortBy = 'ApplySendDate_Desc';    // default value 
    if (criteria == 'sortby') {
        if (val == 'ProjectNo') {
            $('th#sortApplySendDate').removeClass('sort up').removeClass('sort down').addClass('sort');
            var colProjectNo = $('th#sortProjectNo');
            if (colProjectNo.hasClass('sort down')) {
                colProjectNo.removeClass('sort down');
                colProjectNo.addClass('sort up');
                sortBy = 'ProjectNo_Asc'
            }
            else {
                colProjectNo.removeClass('sort up');
                colProjectNo.addClass('sort down');
                sortBy = 'ProjectNo_Desc'
            }
        }
        else {   // 當做是 ApplySendDate
            $('th#sortProjectNo').removeClass('sort up').removeClass('sort down').addClass('sort');
            var colApplySendDate = $('th#sortApplySendDate');
            if (colApplySendDate.hasClass('sort down')) {
                colApplySendDate.removeClass('sort down');
                colApplySendDate.addClass('sort up');
                sortBy = 'ApplySendDate_Asc'
            }
            else {
                colApplySendDate.removeClass('sort up');
                colApplySendDate.addClass('sort down');
                sortBy = 'ApplySendDate_Desc'
            }
        }
    }
    // 取目前的排序條件
    else {
        if ($('th#sortProjectNo').hasClass('sort up')) sortBy = 'ProjectNo_Asc';
        else if ($('th#sortProjectNo').hasClass('sort down')) sortBy = 'ProjectNo_Desc';
        else if ($('th#sortApplySendDate').hasClass('sort up')) sortBy = 'ApplySendDate_Asc';
        else sortBy = 'ApplySendDate_Desc';
    }

    //var parameter = JSON.stringify({
    //    'ProjectStatus': "'" + projectStatus + "'",
    //    'CurrentPage': "'" + pageNumber + "'",
    //    'PageSize': pageSize
    //});

    // 查詢，取得資料
    $.ajax({
        async: false,    // wait until the request is finished! may cause the browser waiting
        url: '/Apply/Search',
        type: "Post",
        data: {
              projectGroup: projectGroup
            , currentPage   : pageNumber
            , pageSize: pageSize
            , orderBy: sortBy
            , '__RequestVerificationToken': function () { return $('input[name=__RequestVerificationToken]').val(); }
           },
       //cache: false,
        success: function (data) {
            $('section#applySearcList.sp').html(data);
 //          var selection = $('section#applySearcList.sp');
  //         selection.html(""); // clear before appending new list
 //          selection.append(data);
        },
        error: function (ob, errStr) {
            alert("An error occured.Please try after sometime." + errStr);
        }
    });

}

// ListProject.cshtml 中使用
function editviewProject(projectId, url) {
    window.location.href = url + '/' + projectId;
};

// AddProject1.cshtml 中使用
function addProjectFormSubmit(act) {
    if (act == "Cancel") {
        var answer = window.confirm("放棄填寫嗎?");
        if (answer) {
            window.location.href = "/Apply/ListProject";
            return;
        }
        return;
    }
    $("#AddProject2").submit();
}

// addProject2.cshtml
function addProject2FormSubmit(act) {
    if (act == "Save") {
        var answer = window.confirm("確定要將計畫送出申請嗎？送出後計畫內容不得再編修");
        if (!answer) {
            return;
        }
    }
    else if (act == "Delete") {
        var answer = window.confirm("確定刪除整體計畫內容？如欲提案須重新「新增計畫申請」");
        if (!answer) {
            return;
        }
    }
    else if (act == "List") {
        var answer = window.confirm("確定要放棄目前所有編輯內容返回清單？");
        if (answer) {
            window.location.href = "/Apply/ListProject";
            return;
        }
    }

    if (verifyBudget() == false) {
        alert('補助款最高不可超過50%(＜=%)，請調整相關金額!');
        return;
    }

    $("#buttonClick").val(act);
    $("#AddProject3").submit();

    $('input[name*="addProject2FormSubmit_"]').each.disabled = true;

    return ;
}

function EditProjectFormSubmit(act, isContinuous) {
    if (act == "Save") {
        var answer = window.confirm("確定要將計畫送出申請嗎？送出後計畫內容不得再編修");
        if (!answer) {
            return;
        }
    }
    else if (act == "Delete") {
        var answer;
        if (isContinuous == 1)  // 延續計畫
            answer = window.confirm("確定刪除整體計畫內容？如欲提案須重新「延續計畫申請」");
        else
            answer = window.confirm("確定刪除整體計畫內容？如欲提案須重新「新增計畫申請」");
        if (!answer) {
            return;
        }
    }
    else if (act == "Cancel") {
        var answer = window.confirm("確定要取消儲存目前所有已編輯內容？");
        if (answer) {
            window.location.href = "/Apply/ListProject";
            return;
        }
        return;
    }

    if (act != "Delete" && verifyBudget() == false) {
        alert('補助款最高不可超過50%(＜=%)，請調整相關金額!');
        return;
    }

    $("#buttonClick").val(act);
    $("#EditProject").submit();

    $('input[name*="EditProjectFormSubmit_"]').each.disabled = true;
    return;
}

function EditProjectBasicFormSubmit(act) {
    if (act == "Save") {
        var answer = window.confirm("確定要更改申請基本資料？編修身分與模組可能會造成已填寫欄位及已上傳檔案遺失。點選確定確認調整身分與模組。");
        if (!answer) {
            return;
        }
    }
    else if (act == "Cancel") {
        var answer = window.confirm("確定要取消儲存目前所有已編輯內容？");
        if (!answer) {
            return;
        }
    }

    $("#buttonClick").val(act);
    $("#EditProjectBasic").submit();

    $('input[name*="EditProjectBasicFormSubmit_"]').each.disabled = true;
    return;
}

function saveProjectApply(returnUrl) {
    alert('儲存送出');
    window.location.href = returnUrl;
}

function saveProjectDraft(returnUrl) {
    alert('暫存草稿');
    window.location.href = returnUrl;
}

function deleteProject(returnUrl) {
    alert('刪除');
    window.location.href = returnUrl;
}

function CancelEditing(returnUrl) {
    alert('放棄');
    window.location.href = returnUrl;
}

///
function hideMessage(msgId, msec) {
    if (msg == null) return;

    var prompt = document.getElementById(msgId);

    prompt.style.visibility = 'visible';

    setTimeout(function () {
       // prompt.fadeOut();
        prompt.style.visibility = 'hidden';
    }, msec)
}



/// 地址中縣市鄉鎮連動
function fillCityDistrict(citySelId, districtSelId) {
    var city = $('select#' + citySelId);
    var cityName = city.val();
    $.ajax({
        url: '/Apply/FillDistrict',
        type: "GET",
        dataType: "JSON",
        data: { cityName: cityName },
        success: function (data) {
            var district = $('select#' + districtSelId);
            district.html(""); // clear before appending new list
            district.append('<option value="">請選擇</option>')
            $.each(data.rows, function (idx, record) {
                district.append(
                    $('<option></option>').val(record.districtName + ':' + record.zipCode).html(record.districtName));
            });
        }
    });
}

/// 取得郵地區號
function fillZipCode(districtSelId, zipCodeId) {
    var district = $('select#' + districtSelId).val();
    var zipCode = district.split(":");
    if (zipCode.length > 0)
        $('input#' + zipCodeId).val(zipCode[1])
    else
        $('input#' + zipCodeId).val("");
}


function reCalculatePeople(idx) {
    // ie 不支援 Math.trunc
	if (!Math.trunc) {
		Math.trunc = function (v) {
			return v < 0 ? Math.ceil(v) : Math.floor(v);
		};
	}
	
    var pm = $('input#HumanResourcePm' + idx);
    var assist = $('input#HumanResourceAssistant' + idx);
    var others = $('input#HumanResourceOthers' + idx);
    var total = $('input#HumanResourceTotal' + idx)

    // 判斷是否非數字
    if (isNaN(parseInt(pm.val())) || pm.val() == null || parseInt(pm.val()) < 0) pm.val(0);
    if (isNaN(parseInt(assist.val())) || assist.val() == null || parseInt(assist.val()) < 0) assist.val(0);
    if (isNaN(parseInt(others.val())) || others.val() == null || parseInt(others.val()) < 0) others.val(0);

    // 取整數
    pm.val(Math.trunc(pm.val()));
    assist.val(Math.trunc(assist.val()));
    others.val(Math.trunc(others.val()));

    total.val(parseInt(pm.val()) + parseInt(assist.val()) + parseInt(others.val()));
}

// 重新計算房間數
function reCalculateRoom(idx) {
    // ie 不支援 Math.trunc
	if (!Math.trunc) {
		Math.trunc = function (v) {
			return v < 0 ? Math.ceil(v) : Math.floor(v);
		};
	}

    // 逐個計算
    var total = 0;

    // Room4Ind
    var room = $('input#Room4Ind' + idx);
    if (isNaN(parseInt(room.val())) || parseInt(room.val()) < 0) room.val(0);
    room.val(Math.trunc(room.val()));
    total += parseInt(room.val());

    // Room4All
    room = $('input#Room4All' + idx);
    if (isNaN(parseInt(room.val())) || parseInt(room.val()) < 0) room.val(0);
    room.val(Math.trunc(room.val()));
    total += parseInt(room.val());

    // room4Inno
    room = $('input#Room4Inno' + idx);
    if (isNaN(parseInt(room.val())) || parseInt(room.val()) < 0) room.val(0);
    room.val(Math.trunc(room.val()));
    total += parseInt(room.val());

    // Room4Meeting
    room = $('input#Room4Meeting' + idx);
    if (isNaN(parseInt(room.val())) || parseInt(room.val()) < 0) room.val(0);
    room.val(Math.trunc(room.val()));
    total += parseInt(room.val());

    // Room4Lab
    room = $('input#Room4Lab' + idx);
    if (isNaN(parseInt(room.val())) || parseInt(room.val()) < 0) room.val(0);
    room.val(Math.trunc(room.val()));
    total += parseInt(room.val());

    // Room4Demo
    room = $('input#Room4Demo' + idx);
    if (isNaN(parseInt(room.val())) || parseInt(room.val()) < 0) room.val(0);
    room.val(Math.trunc(room.val()));
    total += parseInt(room.val());

    $('input#RoomTotal' + idx).val(total);
 }

// 重新計算預算
function reCalculateBudget(typeName, maxGovLimit, maxAddonLimit) {
    // ie 不支援 Math.trunc
	if (!Math.trunc) {
		Math.trunc = function (v) {
			return v < 0 ? Math.ceil(v) : Math.floor(v);
		};
    }

    // 新增計畫
    // BudgetFromGov
    var gov = $('input#BudgetFromGov');
    if (isNaN(parseInt(gov.val())) || gov.val() == null) {
        gov.val(0);
    }
    else {
        var govval = gov.val().replace(/,/g, '');    // 去掉千分位
        if (parseInt(govval) < 0) {
            gov.val(0);
        }
        else {
            gov.val(Math.trunc(govval));
        }
    }

    // BudgetFromAddon
    var addon = $('input#BudgetFromAddon');
    if (isNaN(parseInt(addon.val())) || addon.val() == null) {
        addon.val(0);
    }
    else {
        var addonval = addon.val().replace(/,/g, '');    // 去掉千分位
        if (parseInt(addonval) < 0) {
            addon.val(0);
        }
        else {
            addon.val(Math.trunc(addonval));
        }
    }

    // BudgetFromParentOrg
    var parentOrg = $('input#BudgetFromParentOrg');
    if (isNaN(parseInt(parentOrg.val())) || parentOrg.val() == null) {
        parentOrg.val(0);
    }
    else {
        var parval = parentOrg.val().replace(/,/g, '');    // 去掉千分位
        if (parseInt(parval) < 0) {
            parentOrg.val(0);
        }
        else {
            parentOrg.val(Math.trunc(parval));
        }
    }

    // BudgetFromEnt
    var ent = $('input#BudgetFromEnt');
    if (isNaN(parseInt(ent.val())) || ent.val() == null) {
        ent.val(0);
    }
    else {
        var entval = ent.val().replace(/,/g, '');   // 去掉千分位
        if (parseInt(entval) < 0) {
            ent.val(0);
        }
        else {
            ent.val(Math.trunc(entval));
        }
    }

    // budgetTotal
    var budgetTotal = Math.trunc(gov.val()) + Math.trunc(addon.val())+ Math.trunc(parentOrg.val()) + Math.trunc(ent.val());

    var govPercent;
    var selfPercent;
    if (budgetTotal == 0) {
        govPercent = 0;
        selfPercent = 0;
    }
    else {
        govPercent = ((Math.trunc(gov.val()) + Math.trunc(addon.val())) * 100.00 / budgetTotal).toFixed(2);
        selfPercent = (100 - govPercent).toFixed(2);
    }
    $('input#BudgetFromSelf').val(Math.trunc(ent.val()) + Math.trunc(parentOrg.val()));
    $('input#BudgetGovTotal').val(Math.trunc(gov.val()) + Math.trunc(addon.val()));
    $('input#BudgetFromGovPercent').val(govPercent);
    $('input#BudgetFromSelfPercent').val(selfPercent);
    $('input#BudgetTotal').val(budgetTotal);

    var msg1 = '';
    // 檢查政府補助款是否超過  50%
    if ((Math.trunc(gov.val()) + Math.trunc(addon.val())) > (Math.trunc(parentOrg.val()) + Math.trunc(ent.val()))) {
        msg1 = '<span class="notic">申請補助款最高不可超過總經費50%(含)，請調整金額</span>';
    }
    // typeName, maxGovLimit, maxAddonLimit
    // 技術創業放大器，每案每年申請補助金額上限 500萬元，請調整金額
    // 在地企業創新器，每案每年申請補助金額上限 800萬元，請調整金額
    // T06: 企業加速器 每案每年申請補助金額上限800萬元，請調整金額
    if (Math.trunc(gov.val()) > maxGovLimit) {
        msg1 = msg1 + (msg1 != '' ? '<br>' : '') + '<span class="notic">' + typeName + ' 每案每年申請補助金額上限' + Math.trunc(maxGovLimit / 10000) + ' 萬元，請調整金額</span>';
    }
    // 加值項目每案每年申請金額上限200萬元，請調整金額
    // 企業加速器 加值項目每案每年申請金額上限 200 萬元，請調整金額
    if (Math.trunc(addon.val()) > maxAddonLimit) {
        msg1 = msg1 + (msg1 != '' ? '<br>' : '') + '<span class="notic">' + typeName + ' 加值項目每案每年申請金額上限 ' + Math.trunc(maxAddonLimit / 10000) + ' 萬元，請調整金額</span>';
    }
    $('div#FirstYearPrompt').html(msg1);

    // 延續計畫(第二年)
    // BudgetFromGov2
    var gov2 = $('input#BudgetFromGov2');
    if (isNaN(parseInt(gov2.val())) || gov2.val() == null) {
        gov2.val(0);
    }
    else {
        var govval2 = gov2.val().replace(/,/g, '');    // 去掉千分位
        if (parseInt(govval2) < 0) {
            gov2.val(0);
        }
        else {
            gov2.val(Math.trunc(govval2));
        }
    }

    // BudgetFromAddon2
    var addon2 = $('input#BudgetFromAddon2');
    if (isNaN(parseInt(addon2.val())) || addon2.val() == null) {
        addon2.val(0);
    }
    else {
        var addonval2 = addon2.val().replace(/,/g, '');    // 去掉千分位
        if (parseInt(addonval2) < 0) {
            addon2.val(0);
        }
        else {
            addon2.val(Math.trunc(addonval2));
        }
    }

    // BudgetFromParentOrg2
    var parentOrg2 = $('input#BudgetFromParentOrg2');
    if (isNaN(parseInt(parentOrg2.val())) || parentOrg2.val() == null) {
        parentOrg2.val(0);
    }
    else {
        var parval2 = parentOrg2.val().replace(/,/g, '');    // 去掉千分位
        if (parseInt(parval2) < 0) {
            parentOrg2.val(0);
        }
        else {
            parentOrg2.val(Math.trunc(parval2));
        }
    }

    // BudgetFromEnt2
    var ent2 = $('input#BudgetFromEnt2');
    if (isNaN(parseInt(ent2.val())) || ent2.val() == null) {
        ent2.val(0);
    }
    else {
        var entval2 = ent2.val().replace(/,/g, '');   // 去掉千分位
        if (parseInt(entval2) < 0) {
            ent2.val(0);
        }
        else {
            ent2.val(Math.trunc(entval2));
        }
    }

    // BudgetTotal2
    var budgetTotal2 = Math.trunc(gov2.val()) + Math.trunc(addon2.val()) + Math.trunc(parentOrg2.val()) + Math.trunc(ent2.val());

    var govPercent2;
    var selfPercent2;
    if (budgetTotal2 == 0) {
        govPercent2 = 0;
        selfPercent2 = 0;
    }
    else {
        govPercent2 = ((Math.trunc(gov2.val()) + Math.trunc(addon2.val())) * 100.00 / budgetTotal2).toFixed(2);
        selfPercent2 = (100 - govPercent2).toFixed(2);
    }
    $('input#BudgetFromSelf2').val(Math.trunc(ent2.val()) + Math.trunc(parentOrg2.val()));
    $('input#BudgetGovTotal2').val(Math.trunc(gov2.val()) + Math.trunc(addon2.val()));
    $('input#BudgetFromGovPercent2').val(govPercent2);
    $('input#BudgetFromSelfPercent2').val(selfPercent2);
    $('input#BudgetTotal2').val(budgetTotal2);

    var msg2 = '';
    // 檢查政府補助款是否超過  50%
    if ((Math.trunc(gov2.val()) + Math.trunc(addon2.val())) > (Math.trunc(parentOrg2.val()) + Math.trunc(ent2.val()))) {
        msg2 = '<span class="notic">申請補助款最高不可超過總經費50%(含)，請調整金額</span>';
    }
    // typeName, maxGovLimit, maxAddonLimit
    // 技術創業放大器/在地企業創新器，每案每年申請補助金額上限600萬元，請調整金額
    if (Math.trunc(gov2.val()) > maxGovLimit) {
        msg2 = msg2 + (msg2 != '' ? '<br>' : '') + '<span class="notic">' + typeName + ' 每案每年申請補助金額上限' + Math.trunc(maxGovLimit / 10000) + ' 萬元，請調整金額</span>';
    }
    // 加值項目每案每年申請金額上限200萬元，請調整金額
    if (Math.trunc(addon2.val()) > maxAddonLimit) {
        msg2 = msg2 + (msg2 != '' ? '<br>' : '') + '<span class="notic">' + typeName + ' 加值項目每案每年申請金額上限 ' + Math.trunc(maxAddonLimit / 10000) + ' 萬元，請調整金額</span>';
    }
    $('div#SecondYearPrompt').html(msg2);

    // 總金額
    $('input#BudgetTotalAll').val(budgetTotal + budgetTotal2);

    return msg1 + (msg1 != '' ? '<br>' : '') + msg2
}

/// 檢查補助款不得超過 50%
function verifyBudget() {
    var msg = reCalculateBudget();

    if (msg != '') {
        return false;
    }

    return true;
}

// 已選擇" + @itemchecked + " 項";
//if (Model.NewP.PlanTypeCode != "T04") {
//    domainNameSelect += "/ 至少應選擇 " + Model.ProjectDomainLimitMin + " 項，最多可選擇 " + @Model.ProjectDomainLimitMax + " 項"
function ReCalculateProjectDomain(obj, minCount, maxCount)
{
    var itemChecked = 0;
    var objList = $("input[name='ProjectDomain']"); 
    for (var item in objList) {
        if (objList[item].checked) itemChecked++;
    };
    if (minCount == 0 && maxCount == 0) {
        $('#DomainSelectionDescription').text("已選擇" + itemChecked + " 項");
        return;
    }
    // 判斷是否已超過可選項目
    if (itemChecked > maxCount && obj.checked) {
        obj.checked = false;
        itemChecked--;
    }
    $('#DomainSelectionDescription').text("已選擇" + itemChecked + " 項/ 至少應選擇 " + minCount + " 項，最多可選擇 " + maxCount + " 項");
    return;
}

// 重新展開
function rePositionCoExecutorSection() {
    var _window = $(window);
    var ww = _window.outerWidth();
    var wwSmall = 768;
    //var hh = Math.floor($('.header').outerHeight(true));
    var _tab = $('.tabs')[0];   // id=projectApplyTab
    var _tabItem = $('.tabs .tabItem');
    var tabItemHeight = _tabItem.outerHeight();
    var _tabItemNow = $('#coExecutorSectionTabItem')[0];
    var tvp = _tab.offsetTop;
    var tabIndex = 2/ 2;  // _tabItemNow.index()
    var scollDistance = tvp + tabItemHeight * tabIndex - Math.floor($('.header').outerHeight(true));
    if (ww <= wwSmall) {
        _tabItem.not('.active').next().slideUp();
        _tabItemNow.next().slideDown();
        $("html,body").stop(true, false).animate({ scrollTop: scollDistance });
    } else {
        _tabItem.not('.active').next().hide();
        _tabItemNow.nextElementSibling.visibility = "visible";
        var tabContentHeight = $('#coExecutorSectionTabItem').next().innerHeight();
        $('#projectApplyTab').height = tabContentHeight + tabItemHeight;
    }
}

// 增加一個創意聯盟區塊: 
function addCoExecutorSection(projectId) {        
    $.ajax({
        async: false,    // wait until the request is finished! may cause the browser waiting
        url: '/Apply/AddCoExecutorSection',
        type: "Post",
        data: {
            id: projectId
        },
        //cache: false,
        success: function (data) {
            $(data).insertAfter($('[id^="CoExecutorOrder_"]').last());
            // 變更 共同執行單位 的順序編號
            reorderCoExecutorTitle();

            $('h2.active > a').click();

            // 新增附件區塊
            var idx = Number($(data)[0].id.split("_")[1]);
            addCoExecutorAttachSection(projectId, -1, idx);

            // 重新展開
            //rePositionCoExecutorSection();
        },
        error: function (ob, errStr) {
            alert("An error occured.Please try after sometime." + errStr);
        }
    });

}

//  移除一個block
function removeOneCoExecutor(idx) {
    var element = document.getElementById("CoExecutorOrder_" + idx);
    element.parentNode.removeChild(element);


    // 變更 共同執行單位 的順序編號
    reorderCoExecutorTitle();

    // 移除 Attach File 區塊
    removeCoExecutorAttachSection(idx)
    //rePositionCoExecutorSection();
}

// 變更執行單位的順序
function reorderCoExecutorTitle() {
    var coOrgTitle = $('[name*="coExecutorOrganizationTitle_"]');
    for (var idx = 0; idx < coOrgTitle.length; idx++) {
        coOrgTitle[idx].innerHTML = "共同執行單位 #" + (idx + 1);
    }
}
 
function uploadFileNameChange(file, idx, ord) {
    $('input#OriginalFileName_' + idx + '_'  + ord)[0].value = file[0].name;
    var delbtn = $('#delbtn_' + idx + '_'  + ord);
    if (delbtn === undefined || delbtn.length == 0) {
        var ele = "<input class='delet_btn' type='button' id='delbtn_" + idx + '_'  + ord + "' value='移除' onclick='removeFile(" + idx + "," + ord + ');' + "'>";
        $('#upload_delet_grp_' + idx + '_'  + ord).append(ele);
    }
    // 有改變
    $('#AttachChanged_' + idx + '_'  + ord)[0].value = "Y";
}

//// 刪除
function removeFile(idx, ord) {
    $('input#OriginalFileName_' + idx + '_'  + ord)[0].value = "";
    var delbtn = $('#delbtn_' + idx + '_' + ord);
    if (delbtn !== undefined && delbtn.length > 0) {
        delbtn.remove();
    }
    $('#AttachChanged_' + idx + '_' + ord)[0].value = "Y";
}

// 投入在地縣市
function involvedCityCaptical(val) {
    // 六都
    if (val == 1) {
        $('input[name="InvolvedCityName"]').each(function () {
            $(this)[0].disabled = false;
        });
        var cityName = $("input[name='InvolvedCityName']:checked").val();
        if (cityName == "" || isNaN(cityName)) {
            $('input[name="InvolvedCityName"]')[0].checked = true;
        }
        $('input[name="InvolvedCityName2"]')[0].disabled = true;
        $('input[name="InvolvedCityName2"]')[0].value = "";
    }
    // 其他縣市
    else {
        $('input[name="InvolvedCityName"]').each(function () {
            $(this)[0].disabled = true;
            $(this)[0].checked = false;
        });
        $('input[name="InvolvedCityName2"]')[0].disabled = false;
    }
}



(function () {
    $(function () {
        let _userType = $('input:radio[name=UserType]:checked').val();
        if (_userType && _userType !== 'Admin') {
            $('.bouf').prop('checked', false);
            $('.bouf').prop('disabled', true);
        }
    });

    $('input[type=radio][name=UserType]').change(function () {
        let _userFunc = $('.bouf');

        if (this.value == 'Reviewer') {
            _userFunc.prop('checked', false);
            _userFunc.prop('disabled', true);
        }

        if (this.value == 'Admin') {
            _userFunc.removeAttr('disabled');
        }
    });
})();

function EditProjectReviewAttach(act) {
    if (act == "Save") {
        var answer = window.confirm("確定要將複審資料送出嗎？送出後複審資料內容不得再編修");
        if (!answer) {
            return;
        }
    }
    else if (act == "Cancel") {
        var answer = window.confirm("確定要放棄目前所有編輯內容返回清單？");
        if (answer) {
            window.location.href = "/Apply/ListProject";
            return;
        }
        return;
    }

    $("#EditProjectReviewAttach").submit();

    $('input[name*="EditProjectReviewAttachForm"]').each.disabled = true;
    return;
}
function reviewAttachFileNameChange(file, ext) {
    $('input#OriginalFileName' + ext)[0].value = file[0].name;
    var delbtn = $('#delbtn' + ext);
    if (delbtn === undefined || delbtn.length == 0) {
        var ele = "<input class='delet_btn' type='button' id='delbtn" + ext + "' value='移除' onclick='removeReviewAttachFile(" + '"' + ext + '"' + ');' + "'>";
        $('#upload_delet_grp' + ext).append(ele);
    }
    // 有改變
    $('#Attach' + ext + 'Changed')[0].value = "Y";
}

//// 刪除
function removeReviewAttachFile(ext) {
    $('input#OriginalFileName' + ext)[0].value = "";
    var delbtn = $('#delbtn' + ext);
    if (delbtn !== undefined && delbtn.length > 0) {
        delbtn.remove();
    }
    $('#Attach' + ext + 'Changed')[0].value = "Y";
}

// 增加一個創意聯盟附件區塊: 
function addCoExecutorAttachSection(projectId, executorId, idx) {
    var organizationType = $('input:radio[name="[' + idx + '].OrganizationType"]:checked').val();
    $.ajax({
        async: false,    // wait until the request is finished! may cause the browser waiting
        url: '/Apply/AddCoExecutorAttachSection',
        type: "Post",
        data: {
            projectId: projectId,
            executorId: executorId,
            idx: idx,
            organizationType: organizationType
        },
        //cache: false,
        success: function (data) {
            if ($('#ProjectExecutorAttach_' + idx)[0] === undefined) {
                $(data).insertAfter($('[id^="ProjectExecutorAttach_"]').last());
            }
            else {
                $('#ProjectExecutorAttach_' + idx).html(data);
            }
            reorderCoExecutorAttachTitle();

            $('h2.active > a').click();
            // 重新展開
            //rePositionCoExecutorSection();
        },
        error: function (ob, errStr) {
            alert("An error occured.Please try after sometime." + errStr);
        }
    });

}

// 變更執行單位的順序
function reorderCoExecutorAttachTitle() {
    var coOrgTitle = $('[name*="ProjectExecutorAttachOrganizationTitle_"]');
    for (var idx = 0; idx < coOrgTitle.length; idx++) {
        // coOrgTitle[idx].name 
        var id = coOrgTitle[idx].id.split("_")[1];
        if (id != "0") {
            var title = coOrgTitle[idx].innerHTML.split('#');
            if (title.length >= 2) {
                var idx2 = title[1].split("(")[0];
                coOrgTitle[idx].innerHTML = coOrgTitle[idx].innerHTML.replace("#" + idx2 + "(", "#" + idx + "(");
            }
            else coOrgTitle[idx].innerHTML = "共同執行單位 #" + (idx) + " 附件";
        }
    }
}

// 移除 Attach File 區塊
function removeCoExecutorAttachSection(idx) {
    var element = document.getElementById('ProjectExecutorAttach_' + idx);
    element.parentNode.removeChild(element);

    // 變更 共同執行單位 的順序編號
    reorderCoExecutorAttachTitle();
}

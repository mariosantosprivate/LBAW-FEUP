$(document).ready(function () {

    $("li#icon-task a").css("background-color", "#192532");
    $("li#icon-task a").css("color", "#e9d460");

    var addTaskButton = $(".task-button");

    $('.uncompleted').show();
    $('.completed').hide();

    $('#uncompleted-button').prop("disabled", true);

    addTaskButton.click(function () {

        var clickBtnValue = $(this).val();
        console.log(clickBtnValue);
        var ajaxurl = '../api/tasks/create-task.php',
            data = {'action': clickBtnValue};
        $.post(ajaxurl, data, function (response) {
            var data = JSON.parse(response);
            console.log(data);
            var tasklist = document.getElementById('task-list');
            var row = tasklist.insertRow();
            row.setAttribute("class", "task");
            row.setAttribute("id", data[0].id);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = "<i class='fa fa-check-circle-o' id='complete-button' onclick='completeTask(" + data[0].id + ")'></i>";
            cell2.innerHTML = "<div onclick='toggle(" + data[0].id + ");'><textarea onclick='toggle(" + data[0].id + ");' id=" + data[0].id + " disabled='true'>New Task</textarea></div>";
            cell3.innerHTML = "<i id='delete-button' onclick='deleteTask(" + data[0].id + ")' name='delete-task' class='fa fa-times'></i>";
        });

    });


    $("#task-search-input").keyup(function () {

        let text = $("#task-search-input").val();

        searchTasks(text);


    });

    $('.input-group.date').datepicker();

    $('.select2-assign').select2({
        tags: true,
        maximumSelectionLength: 1
    });

    $('.select2-tags').select2({
        maximumSelectionLength: 1,
        tags: true
    });


    $("#task-name").keyup(function (e) {

        var m = $("input#task-name");
        var value = m.val();
        var taskId = $("#task-name").attr("name");
        $("#" + taskId + " textarea").val(value);

        console.log(taskId);

        console.log($("#" + taskId + " textarea").innerHTML);
        console.log($("#task-name").attr("name"));
        console.log(m.val());
    });

    $(".select2").on('focusout', function () {


        $.ajax({
            type: 'post',
            url: '../api/tasks/assign-task.php',
            data: {'taskAssign': $("#task-assign option:selected").val(), 'taskId': $("#task-name").attr("name")},
            success: function () {

                console.log($("#task-assign option:selected").val());

            }

        });


        if ($("#task-tags option:selected").html() != undefined) {
            $.ajax({
                type: 'post',
                url: '../api/tasks/set-task-tags.php',
                data: {'taskTag': $("#task-tags option:selected").html(), 'taskId': $("#task-name").attr("name")},
                success: function (data) {

                    console.log(data);
                    console.log($("#task-tags option:selected").html());

                }

            });
        }


    });

    $("#task-name").focusout(function (e) {

        $.ajax({
            type: 'post',
            url: '../api/tasks/change-task-name.php',
            data: {'taskName': $("#task-name").val(), 'taskId': $("#task-name").attr("name")},
            success: function () {

                console.log("done");

            }

        });

    });

    $("#task-deadline-date").focusout(function (e) {

        $.ajax({
            type: 'post',
            url: '../api/tasks/set-task-deadline.php',
            data: {
                'taskDeadline': $("#task-deadline-date").val() + " " + $("#task-deadline-time").val(),
                'taskId': $("#task-name").attr("name")
            },
            success: function () {
                console.log($("#task-deadline-date").val() + " " + $("#task-deadline-time").val());
            }

        });

    });

    $("#task-deadline-time").focusout(function (e) {

        $.ajax({
            type: 'post',
            url: '../api/tasks/set-task-deadline.php',
            data: {
                'taskDeadline': $("#task-deadline-date").val() + " " + $("#task-deadline-time").val(),
                'taskId': $("#task-name").attr("name")
            },
            success: function () {
                console.log($("#task-deadline-date").val() + " " + $("#task-deadline-time").val());
            }

        });
    });

    $("#task-description").focusout(function (e) {
        $.ajax({
            type: 'post',
            url: '../api/tasks/change-task-description.php',
            data: {'taskDescription': $("#task-description").val(), 'taskId': $("#task-name").attr("name")},
            success: function () {
                console.log("description: " + $("#task-description").val());
                console.log("id: " + $("#task-name").attr("name"));

            }

        });
    });

    $("#task-tags").focusout(function (e) {
        $.ajax({
            type: 'post',
            url: '../api/tasks/set-task-tags.php',
            data: {'taskTags': $("#task-assign option:selected").val(), 'taskId': $("#task-name").attr("name")},
            success: function (data) {
                console.log($("#task-assign option:selected").val());
                console.log("id: " + $("#task-name").attr("name"));

                console.log(data);
            }

        });
    });

    $("#add-comment-btn").click(function (e) {
        if ($("#comment-content").val() != "") {
            $.ajax({
                type: 'post',
                url: '../api/tasks/add-task-comment.php',
                data: {'taskComment': $("#comment-content").val(), 'taskId': $("#task-name").attr("name")},
                success: function () {
                    console.log($("#comment-content").val(""));
                }

            });

            $.ajax({
                type: 'post',
                url: '../api/tasks/get-task-comments.php',
                data: {'taskId': $("#task-name").attr("name")},
                success: function (request) {
                    var response = JSON.parse(request);

                    console.log(response);

                    $("#task-comments").html("");
                    for (var i = 0; i < response[0].length; i++) {
                        $("#task-comments").append("<div class='comment-info'><img src='../images/users/" + response[0][i].photo_path + "' class='img-circle'><h4>" + response[0][i].name + "</h4></div><p>" + response[0][i].creation_date.substring(0, 16) + "</p><p>" + response[0][i].content + "</p>");
                    }
                }

            });
        }


    });


});


function searchTasks(text) {

    var result;

    var ajaxurl = "../api/tasks/search-tasks.php";
    var data = {'searchTaskText': text};
    $.post(ajaxurl, data, function (response) {

        result = JSON.parse(response);

        removeAllTasks();

        for (let i = 0; i < result.length; i++) {
            let data = result[i][0];

            console.log(result[i][1].length <1);

            var tasklist = document.getElementById('task-list');
            var row = tasklist.insertRow();
            if (data[0].completer_id === null) {
                row.setAttribute("class", "task uncompleted");
            } else {
                row.setAttribute("class", "task completed");
            }
            row.setAttribute("id", data[0].id);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = "<i class='fa fa-check-circle-o' id='complete-button' onclick='completeTask(" + data[0].id + ")'></i>";



            if (data[0].completer_id !== null) {
                if(result[i][1].length < 1){
                    cell2.innerHTML = "<div class='task-name' onclick='toggle(" + data[0].id + ");'><textarea onclick='toggle(" + data[0].id + ");' id=" + data[0].id + " disabled='true'>" + data[0].name + "</textarea><p style='visibility: hidden;' class='hashtag completed'></p></div>";
                }else {
                    cell2.innerHTML = "<div class='task-name' onclick='toggle(" + data[0].id + ");'><textarea onclick='toggle(" + data[0].id + ");' id=" + data[0].id + " disabled='true'>" + data[0].name + "</textarea><p class='hashtag completed'>" + result[i][1][0].name + "</p></div>";
                }
            } else {
                if(result[i][1].length < 1){
                    cell2.innerHTML = "<div class='task-name' onclick='toggle(" + data[0].id + ");'><textarea onclick='toggle(" + data[0].id + ");' id=" + data[0].id + " disabled='true'>" + data[0].name + "</textarea><p style='visibility: hidden;' class='hashtag uncompleted'></p></div>";
                }else {
                    cell2.innerHTML = "<div class='task-name' onclick='toggle(" + data[0].id + ");'><textarea onclick='toggle(" + data[0].id + ");' id=" + data[0].id + " disabled='true'>" + data[0].name + "</textarea><p class='hashtag uncompleted'>" + result[i][1][0].name + "</p></div>";
                }
            }
            cell3.innerHTML = "<i id='delete-button' onclick='deleteTask(" + data[0].id + ")' name='delete-task' class='fa fa-times'></i>";


            if ($('#uncompleted-button').prop("disabled")) {
                showUncompletedTasks();
            } else {
                showCompletedTasks();
            }
        }
    })

}
function toggle(taskId) {

    $.ajax({
        type: 'post',
        url: '../api/tasks/task-details.php',
        data: {'taskId': taskId},
        success: function (request) {

            console.log(request);

            var response = JSON.parse(request);

            console.log(response);

            $("#task-assign").html("");
            $("#task-assign").append($('<option>', {
                value: response[2].id,
                text: response[2].name,
                selected: true
            }));

            $("#task-tags").html("");
            if (response[1].length > 0) {
                $("#task-tags").append($('<option>', {
                    value: response[1][0].id,
                    text: response[1][0].name,
                    selected: true
                }));
            }

            for (var i = 0; i < response[5].length; i++) {
                if (response[5][i].name != "null-tag") {
                    $("#task-tags").append($('<option>', {
                        value: response[5][i].id,
                        text: response[5][i].name,
                    }));
                }
            }


            for (var i = 0; i < response[3].length; i++) {
                $("#task-assign").append($('<option>', {
                    value: response[3][i].id,
                    text: response[3][i].name,
                }));
            }
            if (response[0][0].name != null) {
                $("#task-name").val(response[0][0].name);
            }
            $("#task-name").attr("name", taskId);
            if (response[0][0].description != null) {
                $("#task-description").val(response[0][0].description);
            }
            if (response[0][0].deadline != null) {
                $("#task-deadline-date").attr("value", response[0][0].deadline.split(" ")[0]);
                $("#task-deadline-time").attr("value", response[0][0].deadline.split(" ")[1]);
            }
            var id = "create-task";
            var taskCard = document.getElementById("task-card");
            var state = document.getElementById(id).style.display;
            if (state != 'none') {
                document.getElementById(id).style.display = 'none';
                document.getElementById(id).style.width = '1%';
                taskCard.style.display = 'inline-block';
                document.getElementById('mobile-back').style.display = 'none';
            } else {
                if ($(window).width() < 768) {
                    taskCard.style.width = '1%';
                    taskCard.style.display = 'none';
                    document.getElementById(id).style.display = 'inline-block';
                    document.getElementById('mobile-back').style.display = 'inline-block';
                } else {
                    document.getElementById(id).style.display = 'inline-block';
                    document.getElementById(id).style.width = '40%';
                    taskCard.style.width = '40%';
                    document.getElementById('mobile-back').style.display = 'none';
                }
            }

            $("#task-comments").html("");
            for (var i = 0; i < response[4].length; i++) {
                $("#task-comments").append("<div class='comment-info'><img src='../images/users/" + response[4][i].photo_path + "' class='img-circle'><h4>" + response[4][i].name + "</h4></div><p id='info_date'>" + response[4][i].creation_date.substring(0, 16) + "</p><p>" + response[4][i].content + "</p>");
            }
        }

    });


}

function deleteTask(taskId) {

    $.ajax({
        type: 'post',
        url: '../api/tasks/delete-task.php',
        data: {'taskId': taskId},
        success: function () {

            $('#' + taskId).remove();

        }

    });
}


function completeTask(taskId) {

    if ($("#" + taskId).hasClass("uncompleted")) {
        $("#" + taskId).removeClass("uncompleted");
        $("#" + taskId).addClass("completed");
    } else {
        $("#" + taskId).removeClass("completed");
        $("#" + taskId).addClass("uncompleted");
    }

    if ($('#uncompleted-button').prop("disabled")) {
        showUncompletedTasks();
    } else {
        showCompletedTasks();
    }

    $.ajax({
        type: 'post',
        url: '../api/tasks/complete-task.php',
        data: {'taskId': taskId},
        success: function (result) {

            console.log(result);

        }

    });
}

function back() {

    var id = "create-task";
    var taskCard = document.getElementById("task-card");
    var state = document.getElementById(id).style.display;
    if (state != 'none') {
        document.getElementById(id).style.display = 'none';
        document.getElementById(id).style.width = '1%';
        taskCard.style.width = '70%';
        taskCard.style.display = 'inline-block';
        document.getElementById('mobile-back').style.display = 'none';
    } else {
        if ($(window).width() < 768) {
            taskCard.style.width = '1%';
            taskCard.style.display = 'none';
            document.getElementById(id).style.display = 'inline-block';
            document.getElementById(id).style.width = '70%';
            document.getElementById('mobile-back').style.display = 'inline-block';
        } else {
            document.getElementById(id).style.display = 'inline-block';
            document.getElementById(id).style.width = '40%';
            taskCard.style.width = '40%';
            document.getElementById('mobile-back').style.display = 'none';
        }
    }
}

function showUncompletedTasks() {
    $('.uncompleted').show();
    $('.completed').hide();

    $('#uncompleted-button').prop("disabled", true);
    $('#completed-button').prop("disabled", false);
}

function showCompletedTasks() {
    $('.uncompleted').hide();
    $('.completed').show();

    $('#uncompleted-button').prop("disabled", false);
    $('#completed-button').prop("disabled", true);
}

function changeTagName(tag_name) {

    $("#tag-name").html(tag_name).append('<span class="caret"></span>');

    if (tag_name === 'All') {
        $('.hashtag').each(function (i, obj) {

            console.log($(this));

            $(this).parents('.task').show();

            if ($(this).hasClass("uncompleted")) {
                if ($('#uncompleted-button').prop("disabled")) {
                    $(this).parents('.task').show();
                } else {
                    $(this).parents('.task').hide();
                }
            }

            if ($(this).hasClass("completed")) {
                if ($('#completed-button').prop("disabled")) {
                    $(this).parents('.task').show();
                } else {
                    $(this).parents('.task').hide();
                }
            }

            console.log($(this).hasClass("uncompleted"));

        });
    }
    else {
        $('.hashtag').each(function (i, obj) {
            var name = tag_name;
            console.log($(this).text());

            if ($(this).text() != name || $(this).text() === "#") {
                $(this).parents('.task').hide();
                console.log($(this).parents('.task'));
            } else {
                console.log(tag_name);
                if ($(this).hasClass("uncompleted")) {
                    if ($('#uncompleted-button').prop("disabled")) {
                        $(this).parents('.task').show();
                    } else {
                        $(this).parents('.task').hide();
                    }
                }
                if ($(this).hasClass("completed")) {
                    if ($('#completed-button').prop("disabled")) {
                        $(this).parents('.task').show();
                    } else {
                        $(this).parents('.task').hide();
                    }
                }
            }
        });

    }
}

function removeAllTasks() {
    var tasklist = document.getElementById('task-list');

    $('#task-list .task').each(function (i, obj) {
        $(this).remove();
    });


}

<?php
include_once "common/header.php";
?>

<!-- Custom CSS -->
<link href="../../css/tasks.css" rel="stylesheet">
<script src="../../javascript/tasks.js"></script>


<div id="page-wrapper">

        <!-- Page Heading -->
                <div class="tasks-body">
                    <div class="tasks-nav">
                        <button type="button">To-Do</button>
                        <button type="button">Completed</button>
                    </div>


                    <div class="tasks-card" id="task-card">
                        <div class="tasks-header">
                            <button id="add-task">Add Task</button>
                            <ul class="tasks-tags">
                                <li>#Logistics</li>
                                <li>#Marketing</li>
                            </ul>
                        </div>
                        <div class="task-content">
                            <table class="tasks">
                                <tbody id="task-list">
                                <tr class="task">
                                    <td>
                                        <i class="fa fa-check-circle-o" id="complete-button"></i>
                                    </td>
                                    <td>
                                        <div>
                                            <textarea onclick="toggle();" id="task-title">Tarefa 1</textarea>
                                            <p>#Logistics</p>
                                        </div>
                                    </td>
                                    <td>
                                        <i class="fa fa-times" id="delete-button"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tasks-card create-task row" id="create-task" style="display: none">
                        <div class="col-xs-12" id="create-task-navbar">
                            <div class="col-xs-12" id="assign-to">
                                <img src="../../images/users/avatar5.jpg" class="img-circle">
                                <textarea placeholder="Assign to" id="task-assign"></textarea>
                            </div>
                            <button class="btn btn-danger" id="delete-button"> Delete </button>
                        </div>

                            <div class="col-xs-12" id="create-task-title">
                                <i class="fa fa-check-circle-o" id="complete-button"></i>
                                <textarea placeholder="New Task"></textarea>
                            </div>
                            <div class="col-xs-12" id="create-task-settings">
                                <div class="input-group date">
                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="input-group task-tags">
                                    <span class="input-group-addon"><i class="fa fa-tag"></i></span>
                                    <select class="select2-multiple form-control" multiple="multiple">
                                        <option value="M">Marketing</option>
                                        <option value="L">Logistics</option>
                                        <option value="S">Sponsors</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-12" id="create-task-description">
                                <textarea placeholder="Description"></textarea>
                            </div>
                        <div class="task-comments col-xs-12">
                            <div class="comment-info">
                                <img src="../../images/users/avatar6.png" class="img-circle">
                                <h4>Pedro Costa</h4>
                                <p>Today at 17:49</p>
                            </div>
                            <p>Good luck !</p>

                        </div>
                        <div class="add-comment" id="add-comment">
                            <img src="../../images/users/avatar6.png" class="img-circle">
                            <textarea placeholder="Write a comment..."></textarea>
                            <button class="btn">Add</button>
                        </div>

                    </div>
                    <div id="mobile-back" class="navbar navbar-default navbar-fixed-bottom" onclick="toggle()">
                    <h4>« Back</h4>
                    </div>
                </div>

</div>



<?php
include_once "common/footer.html";
?>



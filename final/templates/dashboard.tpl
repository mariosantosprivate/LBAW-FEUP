<link href="../css/UI2.css" rel="stylesheet"/>
<script src="../javascript/dashboard.js"></script>

<div class="page-wrapper container">
    <div class="row"><br>
        <div id="project-presentation" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="page-header">
                <div id="project-title">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="modal" data-target="#editProjectName"></span>
                    <h2 id="title"> {$projectName}</h2>
                </div>
                <div id="project-description">
                    <span class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editProjectDescription" aria-hidden="true"></span>
                    <span id="subtitle">{$projectDescription}</span>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 dash-card">
            <div class="panel panel-primary">
                <a href="../pages/tasks.php" class="panel-heading">
                    <h4 class="panel-title"><i class="glyphicon glyphicon-check dash-title-icon"></i> Your Tasks
                        <span class="to-page glyphicon glyphicon-menu-right"></span>
                    </h4>
                </a>
                <div class="panel-body">
                    <div class="list-group">
                        {foreach $uncompletedTasks as $task}
                            <button class="list-group-item">
                                <i class="glyphicon glyphicon-menu-right dash-icon"></i>
                                <span class="dash-item-text item-title"> {$task.name}</span>
                                <span class="dash-item-text"> Assigned to: {$taskName=getTaskAssignedName($task.id)}{$taskName.name}</span>
                            </button>
                        {/foreach}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 dash-card">
            <div class="panel panel-primary">
                <a href="../pages/forum.php" class="panel-heading">
                    <h4 class="panel-title"><i class="fa fa-quote-right dash-title-icon"></i> Forum
                        <span class="to-page glyphicon glyphicon-menu-right"></span>
                    </h4>
                </a>
                <div class="panel-body">
                    <div class="list-group">
                        {foreach $forumPosts as $post}
                        <button class="list-group-item">
                            <div class="row">
                                <span class="col-lg-6 col-md-6 col-sm-6 col-xs-6 item-title">
                                    <i class="glyphicon glyphicon-menu-right dash-icon"></i><span
                                            class="dash-item-text">{$post.title}</span>
                                </span>
                                <span class="dash-item-user col-lg-5 col-md-5 col-sm-5 col-xs-5 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                                        <img src="{getPhoto($post.creator_id)}" class="dash-user-thumb"/><span
                                            class="dash-item-username"><small>{$post.username}</small></span>
                                </span>
                            </div>
                        </button>
                        {/foreach}
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 dash-card">
            <div class="panel panel-primary">
                <a href="../pages/meetings.php" class="panel-heading">
                    <h4 class="panel-title"><i class="fa fa-calendar dash-title-icon"></i> Meetings
                        <span class="to-page glyphicon glyphicon-menu-right"></span>
                    </h4>
                </a>
                <div class="panel-body">
                    <div class="list-group">
                        {foreach $meetings as $meeting}
                            <button class="list-group-item">
                                <i class="glyphicon glyphicon-menu-right dash-icon"></i><span
                                        class="dash-item-text item-title">{$meeting.name}</span>
                                <small class="dash-date">{$meeting.date|substr:0:10}</small>
                            </button>
                        {/foreach}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 dash-card">
            <div class="panel panel-primary">
                <a href="../pages/files.php" class="panel-heading">
                    <h4 class="panel-title"><i class="glyphicon glyphicon-file dash-title-icon"></i> Files
                        <span class="to-page glyphicon glyphicon-menu-right"></span>
                    </h4>
                </a>
                <div class="panel-body">
                    <div class="list-group">
                        {foreach $files as $file}
                            {$uploader_name = getNickNameById($file.uploader_id)}
                            {$photo_path = getPhoto($file.uploader_id)}
                            {assign var="format" value=$file.name}
                            {if {$format|substr:-3} eq "png"}
                                {$image = "../images/assets/png.png"}
                            {elseif {$format|substr:-3} eq "pdf"}
                                {$image = "../images/assets/pdf.png"}
                            {elseif {$format|substr:-3} eq "jpg"}
                                {$image = "../images/assets/png.png"}
                            {elseif {$format|substr:-3} eq "JPG"}
                                {$image = "../images/assets/png.png"}
                            {else}
                                {$image = "../images/assets/default.png"}
                            {/if}
                            <button class="list-group-item">
                                <div class="row">
                                <span class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                               <img class="file_show" src={$image}><span class="dash-item-text">{$file.name|truncate:18}</span>
                                </span>
                                    <span class="dash-item-user col-lg-5 col-md-5 col-sm-5 col-xs-5 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                                        <img src={$photo_path} class="dash-user-thumb"/><span
                                                class="dash-item-username"><small>{$uploader_name}</small></span>
                                </span>
                                </div>
                            </button>
                        {/foreach}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 dash-card">
            <div class="panel panel-primary">
                <a href="../pages/team.php" class="panel-heading">
                    <h4 class="panel-title"><i class="fa fa-users dash-title-icon"></i> The Team
                        <span class="to-page glyphicon glyphicon-menu-right"></span>
                    </h4>
                </a>
                <div class="panel-body">
                    <div class="row">
                        {foreach from=$teamMembers item=member}
                            <!--{$photo_path = $team_members[$i]['photo_path']}-->
                            {$photo_path = $member['photo_path']}
                            {include file="./team/member_square.tpl" photopath=$photo_path}
                        {/foreach}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="editProjectName" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Change Project Name</h4>
                </div>
                <div class="modal-body">
                    <div class="new-info">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        <input id="new-title" name="title" placeholder="Change project name here">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onclick="changeProjectName()">Change</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
    <div id="editProjectDescription" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Change Project Description</h4>
                </div>
                <div class="modal-body">
                    <div class="new-info">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        <input id="new-description" name="title" placeholder="Change project description here">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onclick="changeProjectDescription()">Change</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</div>

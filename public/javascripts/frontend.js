  // Mit dem Socket.io-Server verbinden,https://converter-c9-samsn.c9.io
      

    $(function (){
        
        var socket = io.connect('/');
        $("body").append("App: ");
        
        // Warten auf Nachrichten
      socket.on('welcome', function (data) {
        $("#from_startjob_jobid").val(data);
        $("#from_startjob").removeClass('hide');
        
        // Eigenen Event vom Client an den Server schicken
        socket.emit('user agent', navigator.userAgent);
        $("body").append("online")
      });
        socket.on('jobdone', function (donejob) {
           onJobdone(donejob);
        });
        $('#button_startjob').click(function (){
            socket.emit('createjob', { 
                jobid:$("#from_startjob_jobid").val(),
                dropboxurl:$("#from_startjob_dropboxurl").val()  
            });
            animateProgressbar();
        
        });
    });
    
    var onJobdone = function(donejob){
        $("#from_startjob").addClass('hide');
         if(donejob.ok){
            $("<a>").addClass("btn").addClass("btn-default").attr("href",donejob.dl).text("download").appendTo("#main");
            $("<a>").addClass("btn").addClass("btn-default").attr("href",donejob.del).text("delete").appendTo("#main");
        }
        else {
            $("#from_startjob").removeClass('hide')
            
        }
    }
    
    var animateProgressbar = function (){
        setTimeout(function(){
        $('.progress .progress-bar').each(function() {
            var me = $(this);
            var perc = 100;//me.attr("data-percentage");

            //TODO: left and right text handling

            var current_perc = 0;

            var progress = setInterval(function() {
                if (current_perc>=perc) {
                    clearInterval(progress);
                } else {
                    current_perc +=1;
                    me.css('width', (current_perc)+'%');
                }

                me.text((current_perc)+'%');

            }, 50);

        });

    },300);
    }
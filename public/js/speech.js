const greetings = [
    'hi',
    'hello, glad to see you',
    'hi, it is so nice to see you again!'
];

const howAreYouAnswers = [
    'fine, thank you',
    'i\'m very well, thanks!',
    'not bad, thank you!',
    'the same as usual, thank you',
];

const computerScienceDef = [
    'computer science, the study of computers and computing, including their theoretical and algorithmic foundations, hardware and software, and their uses for processing information'
];

const algoritms = [
    'an algorithm is a specific procedure for solving a well-defined computational problem'
];

const intelligent = [
    'is a technical or software system capable of solving problems traditionally considered creative, belonging to a specific subject area, knowledge about which is stored in the memory of such a system'
];

const engineering = [
    'software engineering is defined as a process of analyzing user requirements and then designing, building, and testing software application which will satisfy those requirements.'
];

const parallel = [
    'parallel computing on a single computer uses multiple processors to process tasks in parallel'
];

const distributed = [
    'distributed parallel computing uses multiple computing devices to process those tasks'
];

const parallelDistributed = [
    'parallel computing on a single computer uses multiple processors to process tasks in parallel, whereas distributed parallel computing uses multiple computing devices to process those tasks'
];

const whatCanDo = [
    'i can answer some questions about computer science'
];

const whatCanDiscuss = [
    'i can tell you about computer science, algorithms, parallel and distributed computing, software engineering'
];

$(function(){
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = function() {
            var $voicelist = $('#voices');

            if($voicelist.find('option').length == 0) {
                speechSynthesis.getVoices().forEach(function(voice, index) {
                    var $option = $('<option>')
                        .val(index)
                        .html(voice.name + (voice.default ? ' (default)' :''));

                    $voicelist.append($option);
                });

                $voicelist.material_select();
            }
        }

        $('#speak').click(function(){
            var transcript = $('#message').val();
            var question = transcript.toLowerCase();
            var answer = '';
            if (question == 'hello' || question == 'hi'){
                const random = Math.floor(Math.random() * (3 - 0) + 0);
                console.log('rand: ', random);
                answer = greetings[random];
            }
            else if (question == 'how are you' || question == 'how are you doing' || question == 'what\'s up'){
                const random = Math.floor(Math.random() * (4 - 0) + 0);
                console.log('rand: ', random);
                answer = howAreYouAnswers[random];
            }
            else if (question == 'what is computer science' || question == 'what is informatics'){
                answer = computerScienceDef[0];
            }
            else if (question == 'what is algorithm' || question == 'what is algorithms' || question == 'what can you tell me about algorithms'){
                answer = algoritms[0];
            }
            else if (question == 'what is intelligent system' || question == 'which system we can define as an intelligent'){
                answer = intelligent[0];
            }
            else if (question == 'what is system engineering'){
                answer = engineering[0];
            }
            else if (question == 'parallel computing'){
                answer = parallel[0];
            }
            else if (question == 'distributed computing'){
                answer = distributed[0];
            }
            else if (question == 'difference between parallel and distributed computing' || question == 'difference between distributed and parallel computing'){
                answer = parallelDistributed[0];
            }
            else if (question == 'what can you do'){
                answer = whatCanDo[0];
            }
            else if (question == 'what can we discuss'){
                answer = whatCanDiscuss[0];
            }
            else {
                answer = transcript;
            }
            console.log('answer: ', answer);
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[$('#voices').val()];
            msg.rate = $('#rate').val() / 10;
            msg.pitch = $('#pitch').val();
            msg.text = answer;

            msg.onend = function(e) {
                console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };

            speechSynthesis.speak(msg);
        })
    } else {
        $('#modal1').openModal();
    }
});
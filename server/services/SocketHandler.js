const ChatMessage=require('../model/ChatMessage');

const handleSocketConnection=async(io)=>{
 
    io.on('Connection',async (socket)=>{
        console.log('A User is connected');

        try{
            // handle joining room specific to project
            socket.on('joinProject',(projectID)=>{
                // joining room by projectID
                socket.join(projectID);
                
                // loading and sending past messages to user for this project.
                ChatMessage.find({projectID})
                 .then(messages=>{
                    socket.emit('projectMessages',messages);
                 })
                 .catch(err=>{
                    console.error('Error fetching project messages');
                 })
            });

            // handle when user send a new message
            socket.on('sendMessage',(message)=>{
                const newMessage=new ChatMessage(message);
                newMessage.save()
                    .then(savedMessage=>{
                        io.to(message.projectID).emit('receiveMessage',savedMessage);
                    })
                    .catch(error=>{
                        console.error('Error saving messages');
                    });
            });

        }
        catch(error){
            console.error('Error occured during socket connection');
        }
    

    })
};

module.exports=handleSocketConnection;
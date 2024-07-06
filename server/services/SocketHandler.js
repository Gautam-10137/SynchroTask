const ChatMessage = require("../model/ChatMessage");

const handleSocketConnection = async (io) => {
  io.on("connection", async (socket) => {
    console.log("A User is connected");

    try {
      // handle joining room specific to project
      socket.on("joinProject", (projectID) => {
        // joining room by projectID
        socket.join(projectID);

        // loading and sending past messages to user for this project.
        ChatMessage.find({ projectID })
          .populate("senderID")
          .then((messages) => {
            socket.emit("projectMessages", messages);
          })
          .catch((err) => {
            console.error("Error fetching project messages");
          });
      });

      // handle when user send a new message
      socket.on("sendMessage", (message) => {
        const newMessage = new ChatMessage(message);
        newMessage
          .save()
          .then((savedMessage) => {
            return ChatMessage.findById(savedMessage._id).populate('senderID').exec();
          })
          .then((populatedMessage) => {
            
            io.to(message.projectID).emit('receiveMessage', populatedMessage);
            // console.log(message.projectID);
          })
          .catch((error) => {
            console.error("Error saving messages");
          });
        // console.log(message);
      });
    } catch (error) {
      console.error("Error occured during socket connection");
    }
  });
};

module.exports = handleSocketConnection;

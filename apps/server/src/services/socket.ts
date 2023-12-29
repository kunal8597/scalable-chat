import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
    host:'redis-23590578-kunalm8597-4f23.a.aivencloud.com',
    port:20768,
    username:'default',
    password:'AVNS_UKkh4SwE9-0ounUWfSb'
});
const sub = new Redis({
    host:'redis-23590578-kunalm8597-4f23.a.aivencloud.com',
    port:20768,
    username:'default',
    password:'AVNS_UKkh4SwE9-0ounUWfSb'

});






class SocketService{
    private _io: Server;

    constructor(){
        console.log("Init Socket Service...");
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin: "*",
            },
        
            
        }

        );
        sub.subscribe('MESSAGES')
    }
    public initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners...");
    
        io.on("connect", (socket) => {
          console.log(`New Socket Connected`, socket.id);
          socket.on("event:message", async ({ message }: { message: string }) => {
            console.log("New Message Rec.", message);
            await pub.publish("MESSAGES", JSON.stringify({ message }));

            }
                
            );
        });

        sub.on('message', (channel,message) => {
            if (channel === "MESSAGES") {
                io.emit("message", message);
            }
        }
        
        
        
        )
        
    }
    get io(){
        return this._io;
    }


}

export default SocketService;
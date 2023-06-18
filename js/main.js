const terminal_prompt_command=document.getElementById("terminal_prompt_command");
const accepted_commands=["cd", "ls", "lynx", "mozilla", "history", "help", "motd", "exit"];
const history=[];
let current_directory="/var/www/portfolio/";
let files=null;
let username=document.getElementById("terminal_prompt_username").textContent;
let user_host_seperator=document.getElementById("terminal_prompt_username_hostname_seperator").textContent;
let hostname=document.getElementById("terminal_prompt_hostname").textContent;
let seperator=document.getElementById("terminal_prompt_seperator").textContent;
let path=document.getElementById("active_terminal_prompt_path").textContent;
let symbol=document.getElementById("active_terminal_prompt_symbol").textContent;
const start_time=new Date();
let resolution="1440x900";

function update_current_directory(input) {
    document.getElementById("active_terminal_prompt_path").textContent=input;
    current_directory=input;
}

function handle_on_input(event) {
    //current_textcontent=terminal_prompt_command.textContent;
    document.getElementById("terminal_prompt_cursor")?.remove();
    if (event.code.includes("Key") || event.code.includes("Digit") || event.code.includes("Numpad") || event.code == "Space") {
        event.currentTarget.style.width = (event.currentTarget.textContent?.length + 2) + "ch";
        //terminal_prompt_command.textContent=current_textcontent + event.key;
        //terminal_prompt_command.appendChild(generate_element({elementname: "span", id: "terminal_prompt_cursor"}));
    } else if (event.code == "Backspace" || event.code == "Delete") {
        event.currentTarget.style.width = (event.currentTarget.textContent?.length) + "ch";
        //terminal_prompt_command.appendChild(generate_element({elementname: "span", id: "terminal_prompt_cursor"}));
    } else if (event.code == "ArrowLeft" || event.code == "ArrowRight") {
        current_position=0;
        
        

    } else if (event.code == "Enter") {
        document.execCommand('insertLineBreak');
        event.preventDefault();
        handle_on_submit();
    }
}

function is_valid_command(input) {
    input=input[0];
    valid=false;
    if (typeof input == "string" && input.length>0) {
        for (let index = 0; index < accepted_commands.length; index++) {
            const element = accepted_commands[index];
            if (element.includes(input)) {
                valid=true;
            }
        }
    }
    return valid;
}

function reset_input() {
    terminal_prompt_command.innerHTML="";
    terminal_prompt_command.style.width="2ch";
}

// {elementname: "", id: "", classname: "", value: "", innerHTML: "", textcontent: "", newattr: "", newvalue: ""}
function generate_element(parameters) {
    tmp=null;
    if (typeof parameters.elementname !== "undefined") {
        tmp=document.createElement(parameters.elementname)
        if (typeof parameters.id !== "undefined") { tmp.id=parameters.id; }
        if (typeof parameters.classname !== "undefined") { tmp.className=parameters.classname; }
        if (typeof parameters.value !== "undefined") { tmp.value=parameters.value; }
        if (typeof parameters.innerHTML !== "undefined") { tmp.innerHTML=parameters.innerHTML; }
        if (typeof parameters.src !== "undefined") { tmp.src=parameters.src; }
        if (typeof parameters.style !== "undefined") { tmp.style=parameters.style; }
        if (typeof parameters.textcontent !== "undefined") { tmp.textContent=parameters.textcontent; }
        if (typeof parameters.newattr !== "undefined" && typeof parameters.newvalue !== "undefined") { tmp.setAttribute(parameters.newattr,parameters.newvalue); }
    }
    return tmp;
}

function handle_command(input) {
    result=null;
    input_array=input.split(" ");
    valid=is_valid_command(input_array);
    function_name="show_" + input_array[0] + "_output";
    if (valid && typeof window[function_name] !== "undefined") {        
        result=window[function_name](input_array);
        //result="show_" + input_array[0] + "_output"();
        // switch (input_array[0]) {
        //     case "ls":                
        //         result=show_ls_output(input_array);
        //         break;
        //     case "help":
        //         show_help_output();
        //         break;
        //     case "history":
        //         show_history_output();
        //         break;
        //     case "exit":
        //         show_exit_output();
        //         break;
        //     default:
        //         break;
        // }
    } else {
        result=show_error_output(input);
    }
    history.push(input);
    return result;
}

function handle_on_submit() {
    input=terminal_prompt_command.textContent;
    if (typeof input == "string" && input.length>0) {        
        parent_div=document.getElementById("terminal_commands");
        
        terminal_prompt_line=generate_element({elementname: "div", classname: "terminal_prompt_line"});
        terminal_prompt_history=generate_element({elementname: "span", classname: "terminal_prompt_history", textcontent: `${username}${user_host_seperator}${hostname}${seperator}`});
        terminal_prompt_path=generate_element({elementname: "span", classname: "terminal_prompt_path", textcontent: path});
        terminal_prompt_symbol=generate_element({elementname: "span", classname: "terminal_prompt_symbol", textcontent: symbol});    
        old_command=generate_element({elementname: "span", classname: "old_command", textcontent: input});
        terminal_prompt_line.appendChild(terminal_prompt_history);
        terminal_prompt_line.appendChild(terminal_prompt_path);
        terminal_prompt_line.appendChild(terminal_prompt_symbol);
        terminal_prompt_line.appendChild(old_command);
        parent_div.insertBefore(terminal_prompt_line, document.getElementById("active_line"));

        terminal_prompt_line=generate_element({elementname: "div", classname: "terminal_prompt_line"});
        result=handle_command(input);
        if (typeof result !== "undefined" && result !== null) { terminal_prompt_line.appendChild(result); parent_div.insertBefore(terminal_prompt_line, document.getElementById("active_line")); }
        reset_input();
        parent_div.scrollTop=parent_div.scrollHeight;
        //terminal_prompt_command.appendChild(generate_element({elementname: "span", id: "terminal_prompt_cursor"}));
    }
    return false;
}

window.addEventListener("load",handle_on_load);
document.addEventListener("keydown", function() { terminal_prompt_command.focus() });
terminal_prompt_command.addEventListener("keydown",handle_on_input.bind(this));
//document.getElementById("active_command").addEventListener("submit",handle_on_submit.bind(this));

function handle_on_load() {
    setTimeout(60000);
    scripts=document.getElementById("scripts");
    for (let index = 0; index < accepted_commands.length; index++) {
        const command = accepted_commands[index];
        filename="js/commands/" + command + ".js";        
        element=generate_element({elementname: "script", newattr: "src", newvalue: filename});
        if (command==="motd") { element.addEventListener("load", ()=>{
            terminal_prompt_command.textContent="motd";
            handle_on_submit();
            element.removeEventListener("load", null);
        }); }
        scripts.appendChild(element);
    }

    fetch("assets/json/files.json")
    .then(response => response.json())
    .then(data => {
        files = data;
    });    
}
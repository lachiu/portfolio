const terminal_prompt_command=document.getElementById("terminal_prompt_command");
const accepted_commands=["cd", "ls", "lynx", "help", "exit"];
const history=[];
let current_directory="~";
let files=null;

function handle_on_load() {
    body=document.getElementsByTagName("body");
    scripts=document.getElementById("scripts");
    for (let index = 0; index < accepted_commands.length; index++) {
        const command = accepted_commands[index];
        filename="js/commands/" + command + ".js";        
        element=generate_element({elementname: "script", newattr: "src", newvalue: filename});
        scripts.appendChild(element);
    }

    fetch("http://portfolio.localhost/assets/json/files.json")
    .then(response => response.json())
    .then(data => {
        files = data;
    });

    terminal_prompt_command.value="This is a test";
}

function handle_on_input(event) {
    console.log(event);
    if (event.code.includes("Key") || event.code.includes("Digit") || event.code.includes("Numpad") || event.code == "Space") {
        event.currentTarget.style.width = (event.currentTarget.value.length + 1) + "ch";
    } else if (event.code == "Backspace" || event.code == "Delete") {
        event.currentTarget.style.width = (event.currentTarget.value.length - 1) + "ch";
    }
}

function is_valid_command(input) {
    input=input[0];
    valid=false;
    if (typeof input == "string" && input.length>0) {
        for (let index = 0; index < accepted_commands.length; index++) {
            const element = accepted_commands[index];
            console.log(`element: ${element} - ${element.includes(input)}`);
            if (element.includes(input)) {
                valid=true;
            }
        }
    }
    console.log(valid);
    return valid;
}

function reset_input() {
    terminal_prompt_command.value="";
    terminal_prompt_command.style.width="0ch";
}

// {elementname: "", classname: "", value: "", innerHTML: "", textcontent: "", newattr: "", newvalue: ""}
function generate_element(parameters) {
    tmp=null;
    if (typeof parameters.elementname !== "undefined") {
        tmp=document.createElement(parameters.elementname)
        if (typeof parameters.classname !== "undefined") { tmp.className=parameters.classname; }
        if (typeof parameters.value !== "undefined") { tmp.value=parameters.value; }
        if (typeof parameters.innerHTML !== "undefined") { tmp.innerHTML=parameters.innerHTML; }
        if (typeof parameters.textcontent !== "undefined") { tmp.textContent=parameters.textcontent; }
        if (typeof parameters.newattr !== "undefined" && typeof parameters.newvalue !== "undefined") { tmp.setAttribute(parameters.newattr,parameters.newvalue); }
    }
    return tmp;
}

function handle_command(input) {
    result=null;
    input_array=input.split(" ");
    valid=is_valid_command(input_array);
    if (valid) {        
        result=window["show_" + input_array[0] + "_output"](input_array);
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

function handle_on_submit(event) {
    input=terminal_prompt_command.value;
    console.log(`Input: ${typeof input} - ${input} - ${input.length}`);
    if (typeof input == "string" && input.length>0) {
        username=document.getElementById("terminal_prompt_username").textContent;
        user_host_seperator=document.getElementById("terminal_prompt_username_hostname_seperator").textContent;
        hostname=document.getElementById("terminal_prompt_hostname").textContent;
        seperator=document.getElementById("terminal_prompt_seperator").textContent;
        path=document.getElementById("active_terminal_prompt_path").textContent;
        symbol=document.getElementById("active_terminal_prompt_symbol").textContent;
        

        terminal_prompt_line=generate_element({elementname: "div", classname: "terminal_prompt_line"});
        terminal_prompt_history=generate_element({elementname: "span", classname: "terminal_prompt_history", textcontent: `${username}${user_host_seperator}${hostname}${seperator}`});
        terminal_prompt_path=generate_element({elementname: "span", classname: "terminal_prompt_path", textcontent: path});
        terminal_prompt_symbol=generate_element({elementname: "span", classname: "terminal_prompt_symbol", textcontent: symbol});    
        old_command=generate_element({elementname: "span", classname: "old_command", textcontent: input});

        result=handle_command(input);

        terminal_prompt_line.appendChild(terminal_prompt_history);
        terminal_prompt_line.appendChild(terminal_prompt_path);
        terminal_prompt_line.appendChild(terminal_prompt_symbol);
        terminal_prompt_line.appendChild(old_command);
        if (typeof result !== "undefined" && result !== null) { terminal_prompt_line.appendChild(result); }

        parent_div=document.getElementById("terminal_commands");
        parent_div.insertBefore(terminal_prompt_line, document.getElementById("active_line"));
        reset_input();
        parent_div.scrollTop=parent_div.scrollHeight;
    }
    event.preventDefault();
    return false;
}

window.addEventListener("load",handle_on_load);
document.addEventListener("keydown", function() { terminal_prompt_command.focus() });
terminal_prompt_command.addEventListener("keydown",handle_on_input.bind(this));
document.getElementById("active_command").addEventListener("submit",handle_on_submit.bind(this));
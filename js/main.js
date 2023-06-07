terminal_prompt_command=document.getElementById("terminal_prompt_command");
const accepted_commands=["ls", "exit", "help"];
const history=[];

function handle_on_load() {
    body=document.getElementsByTagName("body");
    scripts=document.getElementById("scripts");
    for (let index = 0; index < accepted_commands.length; index++) {
        const command = accepted_commands[index];
        filename="js/commands/" + command + ".js";        
        element=generate_element({elementname: "script", newattr: "src", newvalue: filename});
        scripts.appendChild(element);
    }
}

function handle_on_input(elem) {
    elem.target.style.width = elem.target.value.length + "ch";
}

function is_valid_command(input) {
    valid=false;
    for (let index = 0; index < accepted_commands.length; index++) {
        const element = accepted_commands[index];
        if (element.includes(input)) {
            valid=true;
        }
    }

    return valid;
}

function reset_input() {
    terminal_prompt_command.value="";
    terminal_prompt_command.style.width="0ch";
}

// {elementname: "", classname: "", value: "", textcontent: "", newattr: "", newvalue: ""}
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
    valid=is_valid_command(input);
    if (valid) {
        input_array=input.split(" ");
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
    username=document.getElementById("terminal_prompt_username").textContent;
    user_host_seperator=document.getElementById("terminal_prompt_username_hostname_seperator").textContent;
    hostname=document.getElementById("terminal_prompt_hostname").textContent;
    seperator=document.getElementById("terminal_prompt_seperator").textContent;
    path=document.getElementById("active_terminal_prompt_path").textContent;
    symbol=document.getElementById("active_terminal_prompt_symbol").textContent;
    input=terminal_prompt_command.value;

    terminal_prompt_line=generate_element({elementname: "div", classname: "terminal_prompt_line"});
    // terminal_prompt_line=document.createElement("div");
    // terminal_prompt_line.className="terminal_prompt_line";
    terminal_prompt_history=generate_element({elementname: "span", classname: "terminal_prompt_history", textcontent: `${username}${user_host_seperator}${hostname}${seperator}`});
    // terminal_prompt_history=document.createElement("span");
    // terminal_prompt_history.textContent=`${username}${user_host_seperator}${hostname}${seperator}`;
    // terminal_prompt_history.className="terminal_prompt_history";
    terminal_prompt_path=generate_element({elementname: "span", classname: "terminal_prompt_path", textcontent: path});
    // terminal_prompt_path=document.createElement("span");
    // terminal_prompt_path.textContent=path;
    // terminal_prompt_path.className="terminal_prompt_path";
    terminal_prompt_symbol=generate_element({elementname: "span", classname: "terminal_prompt_symbol", textcontent: symbol});
    // terminal_prompt_symbol=document.createElement("span");
    // terminal_prompt_symbol.textContent=symbol;
    // terminal_prompt_symbol.className="terminal_prompt_symbol";
    
    old_command=generate_element({elementname: "span", classname: "old_command", textcontent: input});
    // old_command=document.createElement("span");
    // old_command.textContent=input;
    // old_command.className="old_command";

    result=handle_command(input);    

    terminal_prompt_line.appendChild(terminal_prompt_history);
    terminal_prompt_line.appendChild(terminal_prompt_path);
    terminal_prompt_line.appendChild(terminal_prompt_symbol);
    terminal_prompt_line.appendChild(old_command);
    terminal_prompt_line.appendChild(result);

    parent_div=document.getElementById("terminal_commands");
    parent_div.insertBefore(terminal_prompt_line, document.getElementById("active_line"));
    reset_input();
    event.preventDefault();
}

window.addEventListener("load",handle_on_load);
document.addEventListener("keypress", function() { terminal_prompt_command.focus() });
terminal_prompt_command.addEventListener("input",handle_on_input.bind(this));
document.getElementById("active_command").addEventListener("submit",handle_on_submit.bind(this));
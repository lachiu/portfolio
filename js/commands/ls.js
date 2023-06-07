function show_ls_output($args) {    
    result=generate_element({elementname: "div", classname: "result"});
    for (let index = 0; index < 6; index++) {
        tmp=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `-rw-------   1 www-data        www-data        99999 Jan 20 10:00 file.txt`, newattr: "style", newvalue: "white-space-collapse: preserve;"});
        // terminal_line=document.createElement("span");
        // terminal_line.className="terminal_line";
        // terminal_line.textContent=;
        result.appendChild(tmp);
    }
    return result;
}
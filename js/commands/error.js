function show_error_output(input) {
    result=generate_element({elementname: "div", classname: "result"});
    tmp=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `bash: ${input}: <span style=color:orange;>command</span> bestaat niet`});
    result.appendChild(tmp);
    tmp=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `Type <span style=color:orange;>help</span> om een lijst te krijgen met beschikbare commando's.`});
    result.appendChild(tmp);
    return result;
}
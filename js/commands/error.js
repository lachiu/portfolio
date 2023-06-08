function show_error_output(input) {
    result=generate_element({elementname: "div", classname: "result"});
    tmp=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `bash: ${input}: <span style=color:orange;>command</span> not found`});
    result.appendChild(tmp);
    tmp=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `Type <span style=color:orange;>help</span> to get a list of all allowed commands`});
    result.appendChild(tmp);
    return result;
}
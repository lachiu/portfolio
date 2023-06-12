function show_help_output($args) {
    result=generate_element({elementname: "div", classname: "result"});
    line_one=`Er zijn slechts een aantal commands beschikbaar, deze zijn: ls, history, help, mozilla, exit`;
    result.appendChild(generate_element({elementname: "span", classname: "terminal_line", textcontent: line_one}));
    return result;
}
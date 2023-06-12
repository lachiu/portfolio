function show_help_output($args) {
    result=generate_element({elementname: "div", classname: "result"});
    line_one=`Er zijn slechts een aantal commands beschikbaar, deze zijn: <span style=color:orange;>ls</span>, <span style=color:orange;>history</span>, <span style=color:orange;>help</span>, <span style=color:orange;>mozilla</span>, <span style=color:orange;>exit</span>`;
    result.appendChild(generate_element({elementname: "span", classname: "terminal_line", innerHTML: line_one}));
    line_two=`<span style=color:orange;>cd</span> werkt al deels al kan je op dit moment nog niet terug in parent folders, gebruiken op eigen risico dus, F5 om te herstarten.`;
    result.appendChild(generate_element({elementname: "span", classname: "terminal_line", innerHTML: line_two}));
    return result;    
}
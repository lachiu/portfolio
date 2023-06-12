function show_history_output($args) {
    result=generate_element({elementname: "div", classname: "result"});
    if (history.length>0) {
        for (let index = 0; index < history.length; index++) {
            const item = history[index];
            result.appendChild(generate_element({elementname: "span", classname: "terminal_line", innerHTML: `${index+1} ${item}`}));
        }
    } else {
        result.appendChild(generate_element({elementname: "span", classname: "terminal_line", innerHTML: `Er is nog geen <span style=color:orange;>geschiedenis</span>.`}));
    }
    return result;
}
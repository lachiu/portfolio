function show_ls_output($args) {
    function make_format(requiredsize, size) {
        tmp=size.toString();
        required_size=requiredsize-tmp.length;
        string="";
        while (string.length<required_size) {
            string+=" ";
        }
        string+=tmp;
        return string;
    }

    result=generate_element({elementname: "div", classname: "result"});    
    tmp=files[current_directory].files;
    if (typeof tmp !== "undefined") {
        tmp.forEach(selected_file => {
            permission=selected_file.permission;
            number=make_format(4,"1");
            filesize=make_format(13,selected_file.size);
            group=make_format(20,selected_file.group);
            span=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `${permission}${number} ${selected_file.user}${group}${filesize} ${selected_file.date} ${selected_file.time} ${selected_file.name}`, newattr: "style", newvalue: "white-space-collapse: preserve;"});
            result.appendChild(span);
        });
    } else {
        span=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `Directory <span style=color:orange;>${folder}</span> not found`});        
        result.appendChild(span);
    }    
    return result;
}
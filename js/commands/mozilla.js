function show_mozilla_output($args) {
    title="Mozilla Firefox | 127.0.0.1:8080/";
    function generate_menu_bar(input) {
        browser_menu_bar=generate_element({elementname: "section", id: "browser_menu_bar"});
        browser_menu_bar_buttons=generate_element({elementname: "div", id: "terminal_menu_bar_buttons"});
        browser_menu_bar_exit_button=generate_element({elementname: "button", id: "browser_menu_bar_exit_button", classname: "browser_menu_bar_button",innerHTML: "&#10005;", newattr: "onclick", newvalue: "document.getElementById('browser')?.remove();"});
        browser_menu_bar_minimize_button=generate_element({elementname: "button", id: "browser_menu_bar_minimize_button", classname: "browser_menu_bar_button",innerHTML: "&#9472;"});
        browser_menu_bar_maximize_button=generate_element({elementname: "button", id: "browser_menu_bar_maximize_button", classname: "browser_menu_bar_button",innerHTML: "&#9723;"});
        browser_menu_bar_server=generate_element({elementname: "p", id: "browser_menu_bar_server", textcontent: `${title}${input}`});
        title+=input;
        browser_menu_bar_buttons.appendChild(browser_menu_bar_exit_button);
        browser_menu_bar_buttons.appendChild(browser_menu_bar_minimize_button);
        browser_menu_bar_buttons.appendChild(browser_menu_bar_maximize_button);
        browser_menu_bar.appendChild(browser_menu_bar_buttons);
        browser_menu_bar.appendChild(browser_menu_bar_server);
        return browser_menu_bar;
    }

    result=generate_element({elementname: "div", classname: "result"});
    file_extension=$args[1].substring($args[1].length-4);
    current_files=current_directory in files ? files[current_directory].files : null;
    selected_file=$args[1];
    valid=false;
    for (let tmp = 0; tmp < current_files.length; tmp++) {
        const file = current_files[tmp];
        console.log(`File is valid ${file.name === selected_file}`);
        if (file.name === selected_file) { valid=true; break; }
    }

    // console.log(file_extension);
    // console.log(`First check: ${typeof $args[1] === "string"}`);
    // console.log(`Second check: ${$args[1].length>0}`);
    // console.log(`Third check: ${file_extension === "html"}`);
    // console.log(`Fourth check: ${valid===true}`);
    if (typeof $args[1] === "string" && $args[1].length>0 && file_extension === "html" && valid) {
        browser=generate_element({elementname: "div", id: "browser"});
        browser_menu_bar=generate_menu_bar($args[1]);
        browser_body=generate_element({elementname: "section", id: "browser_body"});
        browser_body_iframe=generate_element({elementname: "iframe", id: "opened_mozilla", src: `../pages/${selected_file}`, newattr: "frameborder", newvalue: "0"});
        browser_body_iframe.addEventListener("load", ()=>{ document.getElementById("browser_menu_bar_server").textContent=`${title} | ${document.getElementById("opened_mozilla").contentDocument.title}`; });
        browser_body.appendChild(browser_body_iframe);        
        browser.appendChild(browser_menu_bar);
        browser.appendChild(browser_body);
        document.getElementById("container").appendChild(browser);
    } else {
        result.appendChild(generate_element({elementname: "span", classname: "terminal_line", innerHTML: `${selected_file} <span style=color:orange;>bestaat niet</span>.`}))
        result.appendChild(generate_element({elementname: "span", classname: "terminal_line", innerHTML: `Type <span style=color:orange;>ls</span> om een lijst te zien van beschikbare bestanden.`}))
    }
    return result;
}
let output_student_name = null;
let input_gyankriti_enrollment = null;
let input_gyankriti_email = null;
let input_gyankriti_username = null;

let dropdown_standard = null;
let dropdown_section = null;
let dropdown_shift = null;

let dropdown_bus_facility = null;
let dropdown_route = null;
let dropdown_mess_facility = null;

let output_bus_fee = null;
let output_admission_fee = null;
let output_mess_fee = null;
let output_total_fee = null;

let button_output_bus_fee = null;
let button_output_admission_fee = null;
let button_output_mess_fee = null;

let button_complete_admission_process = null;


let options_array = null;

function initializeJquerySelectors() {
    console.log("initializing jquery selectors");

    output_student_name = $("#output_student_name");

    input_gyankriti_enrollment = $("#input_gyankriti_enrollment");
    input_gyankriti_username = $("#input_gyankriti_username");
    input_gyankriti_email = $("#input_gyankriti_email");

    dropdown_standard = $("#dropdown_standard");
    dropdown_section = $("#dropdown_section");
    dropdown_shift = $("#dropdown_shift");

    dropdown_bus_facility = $('#dropdown_bus_facility');
    dropdown_route = $("#dropdown_route");
    dropdown_mess_facility = $('#dropdown_mess_facility');

    button_complete_admission_process = $("#button_complete_admission_process");

    output_bus_fee = $('#output_bus_fee ');
    output_admission_fee = $('#output_admission_fee ');
    output_mess_fee = $('#output_mess_fee ');
    output_total_fee = $('#output_total_fee ');

    button_output_bus_fee = $('#button_output_bus_fee ');
    button_output_admission_fee = $('#button_output_admission_fee ');
    button_output_mess_fee = $('#button_output_mess_fee ');


    $(".input-disabled").prop("disabled", true);

    // options array
    options_array = options_config.gyankriti_information;
}

function initializeDropdown() {
    console.log("initializing dropdown and adding options");

    append_options_to_dropdown(dropdown_standard, options_array.standard);
    append_options_to_dropdown(dropdown_section, options_array.section);
    append_options_to_dropdown(dropdown_shift, options_array.shift);
    append_options_to_dropdown(dropdown_route, options_array.route);
    append_options_to_dropdown(dropdown_bus_facility, options_array.bus_facility);
    append_options_to_dropdown(dropdown_mess_facility, options_array.mess_facility);
}


function calcTotalFee() {

}


function documentReady() {
    initializeJquerySelectors();
    initializeDropdown();

    // const new_admission_data = JSON.parse(sessionStorage.getItem("new_admission_data"));
    // console.log(new_admission_data.father_mobile_no);

    output_student_name.val($.cookie("student_name"));
    dropdown_standard.val($.cookie('admission_standard'));
    output_admission_fee.val(`${options_array.admission_fee[$.cookie('admission_standard')]}`);


    dropdown_standard.change(() => {
        let val = getValFromDropdown(dropdown_standard);
        if (val === null) {
            output_admission_fee.val("Select Standard");
        } else {
            output_admission_fee.val(`${options_array.admission_fee[val]}`);
        }
    });


    button_output_bus_fee.click(function () {
        console.log('click');
        output_bus_fee.prop("disabled", false);
    });

    button_output_admission_fee.click(function () {
        console.log('click');
        output_admission_fee.prop("disabled", false);
    });

    button_output_mess_fee.click(function () {
        console.log('click');
        output_mess_fee.prop("disabled", false);
    });


    button_complete_admission_process.click(sendJsonDataToServerUsingAjax);

}

function getFormInputData() {

    function getValFromTextBox(text_selector) {
        return (text_selector.val()).trim();
    }


    // console.log(val_student_information);
    return {

        student_name: $.cookie("student_name"),
        student_aadhar: $.cookie("student_aadhar"),

        gyankriti_enrollment: getValFromTextBox(input_gyankriti_enrollment),
        gyankriti_username: getValFromTextBox(input_gyankriti_username),
        gyankriti_email: getValFromTextBox(input_gyankriti_email),

        standard: getValFromDropdown(dropdown_standard),
        section: getValFromDropdown(dropdown_section),
        shift: getValFromDropdown(dropdown_shift),
        route: getValFromDropdown(dropdown_route),

        admission_fee: getValFromTextBox(output_admission_fee)


    }
        ;
}


function sendJsonDataToServerUsingAjax() {

    // function definition ended
    let gyankritiJSON = getFormInputData();

    console.log("Click on submit detected");
    console.log("Logging form Values : \n" + JSON.stringify(gyankritiJSON));


    $.ajax({
        url: '/student/gyankriti-information',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({gyankriti_student_data: gyankritiJSON}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                console.log("Information saved to the database.");
                redirectToGyankritiAdmissionPage();
            } else {
                alert("There was some error in saving the information.")
            }
        }

    });
}

function redirectToGyankritiAdmissionPage(newAdmissionJSON) {

    $.removeCookie('student_name');
    $.removeCookie('student_aadhar');
    $.removeCookie('admission_standard');

    window.location.replace("/student/gyankriti-students");
}


$(documentReady);


$(document).ready(function () {
  $.getJSON("projects-info.json", function (data) {
    console.log(data);
    data = data.sort((x, y) => x.rank - y.rank);
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let projectRow = `<tr>
            <td>
              ${element.name}
            </td>
            <td>
              <iframe
                class="video"
                src="${element.youtubeUrl}"
                allowfullscreen
              ></iframe>
            </td>
            <td class="price">
              <a href="${
                element.codeTopmateUrl ? element.codeTopmateUrl : "#"
              }" ${element.codeTopmateUrl ? "target='_blank'" : ""}
                >Download Code</a
              >
            </td>
          </tr>`;
      $("#projects-table-body").append(projectRow);
    }
    var dt = new DataTable("#projects-table",{
      ordering:false
    });
  }).fail(function () {
    console.log("An error has occurred.");
  });
});

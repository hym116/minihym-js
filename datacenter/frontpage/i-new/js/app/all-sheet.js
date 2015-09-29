  $(function() {
      $("#d11").on("click", function() {
          WdatePicker({
              maxDate: '#F{$dp.$D(\'d12\');}',
              onpicked: cDayFunc
          });
      })
  });
  $("#d12").on("click", function() {
      WdatePicker({
          minDate: '#F{$dp.$D(\'d11\');}',
          onpicked: cDayFunc
      });
  });

  function cDayFunc() {
      var startDate = $("#d11").val();
      var endDate = $("#d12").val();
      if (startDate && endDate) {
          location.href = "http://www.baidu.com";
      }
  }
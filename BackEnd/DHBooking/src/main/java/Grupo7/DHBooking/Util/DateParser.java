package Grupo7.DHBooking.Util;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class DateParser {

    public static LocalDate parseDateFormat(String date) throws ParseException {
        String[] separatedString = date.split("/");
        Integer day = Integer.parseInt(separatedString[0]);
        Integer month = Integer.parseInt(separatedString[1]);

        DateTimeFormatter queryFormat;

        if(day < 10 || month < 10){
            queryFormat = DateTimeFormatter.ofPattern("M/d/yyyy", Locale.US);
        } else {
            queryFormat = DateTimeFormatter.ofPattern("MM/dd/yyyy", Locale.US);
        }

        LocalDate queryDate = LocalDate.parse(date, queryFormat);
        DateTimeFormatter sqlDateForm = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String stringSQLDate = queryDate.format(sqlDateForm);

        LocalDate SQLDate = LocalDate.parse(stringSQLDate, sqlDateForm);

        return SQLDate;
    }
}

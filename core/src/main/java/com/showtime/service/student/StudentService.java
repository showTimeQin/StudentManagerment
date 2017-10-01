package com.showtime.service.student;

import com.showtime.model.view.student.StudentView;
import com.showtime.service.base.BaseService;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.util.List;

/**
* <b><code>Student</code></b>
* <p/>
* Student的具体实现
* <p/>
* <b>Creation Time:</b> Sun Oct 01 17:12:45 CST 2017.
*
* @author qinJianLun
* @version 1.0.0
 * @since andy-core 1.0.0
 */
@Service
public interface StudentService extends BaseService<StudentView> {

    /**
    * 通过 keyword 获取学生分页
    * @param currentPage
    * @param pageSize
    * @return
    */
    Page<StudentView> getStudentByKeyword(String keyword, int currentPage, int pageSize);

}
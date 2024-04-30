package com.vtxlab.projectol.backend_oscar.payload.response.user;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
  private String accessToken;
  private String type = "Bearer";
  private Long id;
  private String firstName;
  private String lastName;
  private String userName;
  private String email;
  private String mobile;
  private String company;
  private String title;
  private Integer py_experience;
  private Integer jv_experience;
  private Integer js_experience;
  private Integer cs_experience;
  private Integer sa_experience;
  private LocalDateTime createdDate;
  private Integer createdBy;
  private LocalDateTime updatedDate;
  private Integer updatedBy;
  private String status;

  private List<String> roles;

  public JwtResponse(String accessToken, //
      Long id, //
      String firstName, //
      String lastName, //
      String mobile, //
      String email, //
      String userName, //
      String company, //
      String title, //
      Integer py_experience, //
      Integer jv_experience, //
      Integer js_experience, //
      Integer cs_experience, //
      Integer sa_experience, //
      String status, //
      LocalDateTime createdDate, //
      Integer createBy, //
      LocalDateTime updateDate, //
      Integer updateBy, //
      List<String> roles) {
    this.accessToken = accessToken;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobile = mobile;
    this.email = email;
    this.userName = userName;
    this.company = company;
    this.title = title;
    this.py_experience = py_experience;
    this.jv_experience = jv_experience;
    this.js_experience = js_experience;
    this.cs_experience = cs_experience;
    this.sa_experience = sa_experience;
    this.status = status;
    this.createdDate = createdDate;
    this.createdBy = createBy;
    this.updatedDate = updateDate;
    this.updatedBy = updateBy;
    this.roles = roles;
  }
}

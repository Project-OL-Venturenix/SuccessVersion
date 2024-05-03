package com.vtxlab.projectol.backend_oscar.payload.response.user;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserScoreResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private Long eventId;
  private Long userId;
  private Long questionId;
  private Integer testCasePassTotal;
  private Double testCaseScoreTotal;
  private Integer testcaseTotal;
  private String status;
  private boolean isPass() {
    return this.testCasePassTotal == 10;
  };
  private LocalDateTime createdDate;
  private Integer createdBy;
  private LocalDateTime updatedDate;
  private Integer updatedBy;

  public UserScoreResponse(String accessToken, Long id, Long eventId,
      Long userId, Long questionId, Integer testcaseTotal,
      Integer testCasePassTotal, Double testCaseScoreTotal,
      LocalDateTime createdDate, Integer createdBy, LocalDateTime updatedDate,
      Integer updatedBy) {
    this.token = accessToken;
    this.id = id;
    this.eventId = eventId;
    this.userId = userId;
    this.questionId = questionId;
    this.testCasePassTotal = testCasePassTotal;
    this.testCaseScoreTotal = testCaseScoreTotal;
    this.testcaseTotal = testcaseTotal;
    this.status = this.isPass() == true ? "Pass" : "Fail";
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;

  }
}

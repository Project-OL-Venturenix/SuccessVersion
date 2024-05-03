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
public class UserQuestionSubmitResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private Long eventId;
  private Long questionId;
  private Long userId;
  private Double runTimeByMsec;
  private LocalDateTime submitTime;
  private String status;
  private LocalDateTime createdDate;
  private Integer createdBy;
  private LocalDateTime updatedDate;
  private Integer updatedBy;

  public UserQuestionSubmitResponse(String accessToken, //
      Long id, //
      Long eventId, //
      Long questionId, //
      Long userId, //
      Double runTimeByMsec, //
      LocalDateTime submitTime, //
      String status, //
      LocalDateTime createdDate, //
      Integer createdBy, //
      LocalDateTime updatedDate, //
      Integer updatedBy) {
    this.token = accessToken;
    this.id = id;
    this.eventId = eventId;
    this.questionId = questionId;
    this.userId = userId;
    this.runTimeByMsec = runTimeByMsec;
    this.submitTime = submitTime;
    this.status = status;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;

  }
}

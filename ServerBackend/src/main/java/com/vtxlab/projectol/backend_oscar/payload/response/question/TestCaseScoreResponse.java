package com.vtxlab.projectol.backend_oscar.payload.response.question;

import java.time.LocalDateTime;

public class TestCaseScoreResponse {
  private String token;
  private String type = "Bearer";
  private Long id; 
  
  private String testCaseScoreDesc;
  private Double testCaseScore;
  private String status;
  
  private LocalDateTime createdDate;

  
  private Integer createdBy;

  
  private LocalDateTime updatedDate;

  
  private Integer updatedBy;
  
  
  public TestCaseScoreResponse(String accessToken, Long id, String testCaseScoreDesc, Double testCaseScore,  String status, LocalDateTime createdDate, Integer createdBy, LocalDateTime updatedDate, Integer updatedBy) {
    this.token = accessToken;
    this.id = id;
    this.testCaseScoreDesc = testCaseScoreDesc;
    this.testCaseScore = testCaseScore;
    this.status = status;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
  
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTestcasescoredesc() {
    return testCaseScoreDesc;
  }

  public void setTestcasescoredesc(String testCaseScoreDesc) {
    this.testCaseScoreDesc = testCaseScoreDesc;
  }

  public Double setTestcasescore() {
    return testCaseScore;
  }

  public void setTestcasescore(Double testCaseScore) {
    this.testCaseScore = testCaseScore;
  }


  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

public Integer getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(Integer createdBy) {
    this.createdBy = createdBy;
  }

  public LocalDateTime getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(LocalDateTime createdDate) {
    this.createdDate = createdDate;
  }

   public Integer getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(Integer updatedBy) {
    this.updatedBy = updatedBy;
  }

  public LocalDateTime getupdatedDate() {
    return updatedDate;
  }

  public void setUpdatedDate(LocalDateTime updatedDate) {
    this.updatedDate = updatedDate;
  }
}

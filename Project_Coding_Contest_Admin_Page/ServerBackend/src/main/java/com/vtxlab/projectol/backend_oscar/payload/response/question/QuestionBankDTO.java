package com.vtxlab.projectol.backend_oscar.payload.response.question;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.vtxlab.projectol.backend_oscar.payload.response.event.EventDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonPropertyOrder({"id", "question", "testAnswer", "methodSignatures",
    "bonusRuntime", "createdDate", "createdBy", "updatedDate", "updatedBy",
    "events"})
public class QuestionBankDTO {
  @JsonProperty("id")
  private Long questionId;

  private String question;

  private String testAnswer;

  private String methodSignatures;

  private Integer bonusRuntime;

  private LocalDateTime createdDate;

  private Integer createdBy;

  private LocalDateTime updatedDate;

  private Integer updatedBy;

  private Set<EventDTO> events = new HashSet<>();

}

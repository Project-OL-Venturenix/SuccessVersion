package com.vtxlab.projectol.backend_oscar.payload.request.event;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class EventRequest {

  @NotBlank
  private String name;
  private String status;
  private LocalDate eventDate;
  private String targetStartTime;
  private String targetEndTime;
  private LocalDateTime createdDate;
  private Integer createdBy;
  private LocalDateTime updatedDate;
  private Integer updatedBy;

}
